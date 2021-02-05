
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from config.auth_middleware import JWTAuthMiddleWare
import chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.prod')

application = ProtocolTypeRouter({
    "http" : get_asgi_application(),
    "websocket" : JWTAuthMiddleWare(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    )
})
