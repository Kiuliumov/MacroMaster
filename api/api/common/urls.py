from django.urls import path

from api.common.views import ContactMessageListCreateView

urlpatterns = [
    path('contact-messages/', ContactMessageListCreateView.as_view(), name='contact-messages-create'),
]