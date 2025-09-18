from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import render
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, User, ResetPasswordSerializer, ForgotPasswordSerializer
from rest_framework import generics, permissions
from .models import Profile
from .serializers import ProfileSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.conf import settings

token_generator = PasswordResetTokenGenerator()


class RegisterView(APIView):

    """
    Handles user registration.

    - Accepts `POST` requests with user registration data.
    - Creates a new inactive user and sends an activation email
      containing a tokenized activation link.
    - Response:
        201: User created, activation email sent.
        400: Validation errors.
    """

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            activation_link = f"http://localhost:5173/activate/{uid}/{token}/"

            subject = "Activate your account"
            message = f"Hi {user.username},\n\nClick the link to activate your account:\n{activation_link}"
            send_mail(subject, message, None, [user.email])

            return Response(
                {"message": "User registered. Please check your email to activate your account."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateAccountView(APIView):
    """
    Activates a user account.

    - Accepts `GET` requests with `uidb64` and `token` in the URL.
    - Validates the token and activates the corresponding user account.
    - Issues a JWT access and refresh token upon success.
    - Response:
        200: Account activated, tokens returned.
        400: Invalid or expired activation link.
    """

    def get(self, request, uidb64, token):
        User = get_user_model()

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user and not user.is_active and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Account activated successfully!",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid or expired link"}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
        Handles user login.

        - Accepts `POST` requests with `username` and `password`.
        - Authenticates the user and returns user details along with
          an access token.
        - Sets a secure HTTP-only cookie containing the refresh token.
        - Response:
            200: User authenticated, tokens returned.
            401: Invalid credentials.
        """
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        profile = Profile.objects.filter(user=user).first()
        refresh = RefreshToken.for_user(user)

        response = Response({
            "user": {
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
                "stats": profile.stats if profile else {},
            },
            "access": str(refresh.access_token),
        })

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=not settings.DEBUG,
            samesite="Lax",
            path="/api/auth/",
            max_age=7 * 24 * 60 * 60,
        )

        return response


class RefreshAccessView(APIView):
    def post(self, request):
        refresh_cookie = request.COOKIES.get("refresh")
        if not refresh_cookie:
            return Response({"detail": "No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_cookie)
            new_access = str(refresh.access_token)
            return Response({"access": new_access})
        except InvalidToken:
            return Response({"detail": "Invalid refresh token"}, status=401)

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out"}, status=200)
        response.delete_cookie("refresh", path="/api/auth/")
        return response


class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    async def get_object(self):
        return await Profile.objects.select_related('user').aget(user=self.request.user)

class CheckRegisteredUsernames(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')

        if not username:
            return Response({"detail": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username__iexact=username, is_active=True).exists():
            return Response({"detail": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Username available."}, status=status.HTTP_200_OK)


class CheckRegisteredEmails(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email, is_active=True).exists():
            return Response({"detail": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Email available."}, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "user": {
                "username": request.user.username,
                "email": request.user.email,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
                "is_staff": request.user.is_staff,
                "is_superuser": request.user.is_superuser,
                "stats": profile.stats,
            }
        }, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = User.objects.get(email=email)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

            subject = "Password Reset Request"
            message = f"Hi {user.username},\n\nClick the link below to reset your password:\n{reset_link}\n\nIf you didn’t request this, you can safely ignore this email."
            send_mail(subject, message, None, [user.email])

            return Response(
                {"message": "Password reset link sent to your email."},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Password has been reset successfully."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            return Response({"detail": "Invalid input data"}, status=status.HTTP_400_BAD_REQUEST)

        if gender == "male":
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height - 5 * age - 161

        activity_map = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very_active": 1.9
        }
        multiplier = activity_map.get(activity_level, 1.2)
        maintenance_calories = bmr * multiplier

        if goal == "lose":
            daily_calories = maintenance_calories - 500
        elif goal == "gain":
            daily_calories = maintenance_calories + 500
        else:
            daily_calories = maintenance_calories

        profile, _ = Profile.objects.get_or_create(user=user)
        profile.stats = {
            "weight": weight,
            "height": height,
            "age": age,
            "gender": gender,
            "activity_level": activity_level,
            "goal": goal,
            "bmr": round(bmr),
            "maintenance_calories": round(maintenance_calories),
            "daily_calories": round(daily_calories),
        }
        profile.save()

        return Response({
            "message": "Onboarding completed successfully",
            "stats": profile.stats
        }, status=status.HTTP_200_OK)