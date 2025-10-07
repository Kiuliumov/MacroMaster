from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageListCreateView(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all().order_by('-id')
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        message = serializer.save()
        # Broadcast to WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "contact_messages",
            {
                "type": "broadcast_message",
                "data": {
                    "action": "created",
                    "message": ContactMessageSerializer(message).data,
                },
            }
        )


class ContactMessageDetailView(generics.RetrieveDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_destroy(self, instance):
        message_id = instance.id
        instance.delete()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "contact_messages",
            {
                "type": "broadcast_message",
                "data": {
                    "action": "deleted",
                    "message": {"id": message_id},
                },
            }
        )
