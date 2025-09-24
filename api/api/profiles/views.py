from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

from .models import Profile
from .serializers import (
    RegisterSerializer,
    User,
    ResetPasswordSerializer,
    ForgotPasswordSerializer,
    ProfileSerializer
)


class RegisterView(APIView):
    """Handles user registration and sends activation email."""

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_link = f"http://localhost:5173/activate/{uid}/{token}/"

            send_mail(
                "Activate your account",
                f"Hi {user.username}, click the link to activate your account:\n{activation_link}",
                None,
                [user.email]
            )
            return Response({"message": "User registered. Check your email to activate your account."}, status=201)
        return Response(serializer.errors, status=400)


class ActivateAccountView(APIView):
    """Activates a user account and returns JWT tokens."""

    def get(self, request, uidb64, token):
        UserModel = get_user_model()
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = UserModel.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            return Response({"error": "Invalid link"}, status=400)

        if user.is_active:
            return Response({"error": "Account already activated"}, status=400)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=400)

        user.is_active = True
        user.save()
        refresh = RefreshToken.for_user(user)

        try:
            profile = Profile.objects.get(user=user)
            stats = profile.stats
        except Profile.DoesNotExist:
            stats = {}

        response = Response({
            "message": "Account activated successfully!",
            "user": {
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
                "stats": stats,
            }
        })

        response.set_cookie("access", str(refresh.access_token), httponly=False, secure=not settings.DEBUG, samesite="Lax", path="/", max_age=300)
        response.set_cookie("refresh", str(refresh), httponly=True, secure=not settings.DEBUG, samesite="Lax", path="/api/auth/", max_age=7*24*60*60)
        return response

class LoginView(APIView):
    """Login user and set JWT cookies."""

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if not user:
            return Response({"detail": "Invalid credentials"}, status=401)

        refresh = RefreshToken.for_user(user)
        profile = Profile.objects.filter(user=user).first()

        response = Response({
            "user": {
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
                "stats": profile.stats if profile else {},
            }
        })

        response.set_cookie("access", str(refresh.access_token), httponly=False, secure=not settings.DEBUG, samesite="Lax", path="/", max_age=300)
        response.set_cookie("refresh", str(refresh), httponly=True, secure=not settings.DEBUG, samesite="Lax", path="/api/auth/", max_age=7*24*60*60)
        return response


class RefreshAccessView(APIView):
    """Refresh access token using refresh cookie."""

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response({"detail": "No refresh token"}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)
            response = Response({"access": new_access})
            response.set_cookie("access", new_access, httponly=False, secure=not settings.DEBUG, samesite="Lax", path="/", max_age=300)
            return response
        except InvalidToken:
            return Response({"detail": "Invalid refresh token"}, status=401)


class LogoutView(APIView):
    """Logout user and delete cookies."""

    def post(self, request):
        response = Response({"message": "Logged out"}, status=200)
        response.delete_cookie("refresh", path="/api/auth/")
        response.delete_cookie("access", path="/")
        return response

class MeView(APIView):
    """Returns current user's info."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)
        return Response({
            "user": {
                "username": request.user.username,
                "email": request.user.email,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
                "is_staff": request.user.is_staff,
                "is_superuser": request.user.is_superuser,
                "stats": profile.stats
            }
        })


class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    async def get_object(self):
        return await Profile.objects.select_related("user").aget(user=self.request.user)


class CheckRegisteredUsernames(APIView):
    def post(self, request):
        username = request.data.get("username")
        if not username:
            return Response({"detail": "Username required"}, status=400)
        if User.objects.filter(username__iexact=username, is_active=True).exists():
            return Response({"detail": "Username taken"}, status=400)
        return Response({"detail": "Username available"})


class CheckRegisteredEmails(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email required"}, status=400)
        if User.objects.filter(email=email, is_active=True).exists():
            return Response({"detail": "Email taken"}, status=400)
        return Response({"detail": "Email available"})


class ForgotPasswordView(APIView):
    """Send password reset email with token."""

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"detail": "User with this email does not exist"}, status=400)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

            send_mail(
                "Password Reset Request",
                f"Hi {user.username},\nClick the link to reset your password:\n{reset_link}\nIgnore if you didn't request.",
                None,
                [user.email]
            )
            return Response({"message": "Password reset link sent"}, status=200)
        return Response(serializer.errors, status=400)


class ResetPasswordView(APIView):
    """Reset password using token."""

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset successfully"}, status=200)
        return Response(serializer.errors, status=400)

class OnboardingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        try:
            weight = float(data.get("weight"))
            height = float(data.get("height"))
            age = int(data.get("age"))
            gender = data.get("gender")
            activity_level = data.get("activity_level")
            goal = data.get("goal")
        except (TypeError, ValueError):
            return Response({"detail": "Invalid input data"}, status=400)

        bmr = 10 * weight + 6.25 * height - 5 * age + (5 if gender == "male" else -161)
        activity_map = {"sedentary": 1.2, "light": 1.375, "moderate": 1.55, "active": 1.725, "very_active": 1.9}
        maintenance_calories = bmr * activity_map.get(activity_level, 1.2)
        daily_calories = maintenance_calories + (500 if goal=="gain" else -500 if goal=="lose" else 0)

        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

        profile.age = age
        profile.gender = gender
        profile.height_cm = height
        profile.weight_kg = weight
        profile.activity_level = activity_level
        profile.goal = goal
        profile.daily_calorie_goal = round(daily_calories)
        profile.onboarding = True
        profile.target_weight_kg = weight + 5 if goal=="gain" else weight - 5 if goal=="lose" else weight
        profile.save()

        return Response({"message": "Onboarding completed", "stats": profile.stats}, status=200)
