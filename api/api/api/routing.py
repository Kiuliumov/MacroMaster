from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"api/ws/contact-messages/$", consumers.ContactMessageConsumer.as_asgi()),
]
