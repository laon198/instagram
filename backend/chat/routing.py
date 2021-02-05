from django.urls import re_path

from chat import consumers

websocket_urlpatterns = [
    # re_path(r'ws/chat/test/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/chat/(?P<username>\w+)/$', consumers.ChatConsumer.as_asgi()),
]