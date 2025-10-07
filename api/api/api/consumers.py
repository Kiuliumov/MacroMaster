import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "contact_messages"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        # Handle deletion
        if data.get("action") == "delete":
            msg_id = data.get("id")
            if msg_id:
                deleted_msg = await self.delete_message(msg_id)
                if deleted_msg:
                    # Broadcast deletion to all clients
                    await self.channel_layer.group_send(
                        self.group_name,
                        {
                            "type": "broadcast_message",
                            "data": {"action": "deleted", "message": {"id": msg_id}},
                        }
                    )

    async def broadcast_message(self, event):
        await self.send(text_data=json.dumps(event["data"]))

    @database_sync_to_async
    def delete_message(self, msg_id):
        try:
            msg = ContactMessage.objects.get(id=msg_id)
            msg.delete()
            return True
        except ContactMessage.DoesNotExist:
            return False
