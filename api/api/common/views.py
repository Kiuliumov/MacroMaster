from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageListCreateView(generics.ListCreateAPIView):
    """
    GET: List all contact messages
    POST: Submit a new contact message
    """
    queryset = ContactMessage.objects.all().order_by('-id')
    serializer_class = ContactMessageSerializer


class ContactMessageDetailView(generics.RetrieveDestroyAPIView):
    """
    GET: Retrieve a specific message (optional)
    DELETE: Delete a specific message by ID
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
