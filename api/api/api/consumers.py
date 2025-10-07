import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ContactMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "contact_messages"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")
        message = data.get("message")

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "broadcast_message",
                "action": action,
                "message": message,
            }
        )

    async def broadcast_message(self, event):
        await self.send(text_data=json.dumps({
            "action": event["action"],
            "message": event["message"],
        }))
