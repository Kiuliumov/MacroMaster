from django.urls import path
from . import views
from .views import (
    ActivateAccountView,
    ForgotPasswordView,
    ResetPasswordView,
    RefreshAccessView,
    LogoutView,
    OnboardingView,
)

urlpatterns = [
    # Auth
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("activate/<uidb64>/<token>/", ActivateAccountView.as_view(), name="activate"),
    path("refresh/", RefreshAccessView.as_view(), name="refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),

    # Validation
    path("check_email/", views.CheckRegisteredEmails.as_view(), name="check_email"),
    path("check_username/", views.CheckRegisteredUsernames.as_view(), name="check_username"),

    # Password reset
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),

    # User & profile
    path("me/", views.MeView.as_view(), name="me"),
    path("profile/", views.ProfileDetailView.as_view(), name="profile"),
    path("onboarding/", OnboardingView.as_view(), name="onboarding"),
]
