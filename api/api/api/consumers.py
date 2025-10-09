import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async


class ContactMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "contact_messages"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        messages = await self.get_all_messages()
        await self.send(
            text_data=json.dumps({"action": "init", "messages": messages})
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")

        if action == "create":
            message_obj = await self.create_contact_message(data)
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "broadcast_message",
                    "action": "create",
                    "message": self.message_to_dict(message_obj),
                },
            )

        elif action == "delete":
            message_id = data.get("id")
            deleted = await self.delete_contact_message(message_id)
            if deleted:
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        "type": "broadcast_message",
                        "action": "delete",
                        "id": message_id,
                    },
                )

    async def broadcast_message(self, event):
        await self.send(text_data=json.dumps(event))

    # importing inside the helper methods because the apps need to load first. Thanks django <3;

    @sync_to_async
    def create_contact_message(self, data):

        from common.models import ContactMessage

        return ContactMessage.objects.create(
            name=data.get("name", ""),
            email=data.get("email", ""),
            subject=data.get("subject", ""),
            message=data.get("message", ""),
        )

    @sync_to_async
    def delete_contact_message(self, message_id):

        from common.models import ContactMessage

        try:
            obj = ContactMessage.objects.get(id=message_id)
            obj.delete()
            return True
        except ContactMessage.DoesNotExist:
            return False

    @sync_to_async
    def get_all_messages(self):

        from common.models import ContactMessage

        return [self.message_to_dict(m) for m in ContactMessage.objects.all()]

    def message_to_dict(self, message_obj):
        
        from common.models import ContactMessage

        return {
            "id": message_obj.id,
            "name": message_obj.name,
            "email": message_obj.email,
            "subject": message_obj.subject,
            "message": message_obj.message,
            "created_at": message_obj.created_at.isoformat(),
        }
