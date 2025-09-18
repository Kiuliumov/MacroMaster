from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Profile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering new users.

    - Validates that `username` and `email` are unique.
    - Requires password confirmation (`password2`).
    - Ensures password length is at least 8 characters.
    - Returns a new inactive user instance on creation.
    """
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Email is already in use.")
        ]
    )
    username = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Username is already taken.")
        ]
    )
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password", "password2")

    def validate(self, data):
        """Ensure the two password fields match."""
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        return data

    def create(self, validated_data):
        """Create a new user with validated data."""
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Profile model.

    - Exposes related `username` and `email` from the User model (read-only).
    - Includes profile-related fields such as bio, picture, and stats.
    - Ensures created/updated timestamps are read-only.
    """
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "username", "email",
            "age", "gender", "height_cm", "weight_kg",
            "activity_level", "goal", "target_weight_kg",
            "daily_calorie_goal", "profile_picture", "bio",
            "created_at", "updated_at",
        ]
        read_only_fields = ["username", "email", "created_at", "updated_at"]


class ForgotPasswordSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset.

    - Accepts an email field.
    - Validates that a user with this email exists.
    """
    email = serializers.EmailField()

    def validate_email(self, value):
        """Ensure that the provided email belongs to a registered user."""
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for resetting a user's password.

    - Accepts `uid`, `token`, and `new_password`.
    - Validates that UID corresponds to a valid user.
    - Validates that the token is valid and not expired.
    - Updates the user's password securely.
    """
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, attrs):
        """Validate UID and token, and attach the user to attrs if valid."""
        uid = attrs.get("uid")
        token = attrs.get("token")

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (User.DoesNotExist, ValueError, TypeError):
            raise serializers.ValidationError({"uid": "Invalid UID"})

        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError({"token": "Invalid or expired token"})

        attrs["user"] = user
        return attrs

    def save(self, **kwargs):
        """Set the new password for the validated user."""
        password = self.validated_data["new_password"]
        user = self.validated_data["user"]
        user.set_password(password)
        user.save()
        return user
