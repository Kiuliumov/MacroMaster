from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from .permissions import IsJWTAdmin

class ContactMessageListCreateView(generics.ListCreateAPIView):
    """
    GET: List all contact messages
    POST: Submit a new contact message
    """
    queryset = ContactMessage.objects.all().order_by('-id')
    serializer_class = ContactMessageSerializer
