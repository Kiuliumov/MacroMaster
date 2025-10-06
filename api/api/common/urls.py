# urls.py
from django.urls import path
from .views import ContactMessageListCreateView, ContactMessageDetailView

urlpatterns = [
    path('contact-messages/', ContactMessageListCreateView.as_view(), name='messages-list-create'),
    path('contact-messages/<int:pk>/', ContactMessageDetailView.as_view(), name='messages-detail-delete'),
]
