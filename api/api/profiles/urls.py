from django.urls import path

from . import views
from .views import ActivateAccountView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path("activate/<uidb64>/<token>/", ActivateAccountView.as_view(), name="activate"),
    path("check_email/", views.CheckRegisteredEmails.as_view(), name="check_email"),
    path("check_username/", views.CheckRegisteredUsernames.as_view(), name="check_username"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("me/", views.MeView.as_view(), name="me"),
]