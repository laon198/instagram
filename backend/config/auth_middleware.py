from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from rest_framework_jwt.authentication import jwt_decode_handler, jwt_get_username_from_payload
from channels.middleware import BaseMiddleware


User = get_user_model()

@database_sync_to_async
def get_user(token_key):
    payload = jwt_decode_handler(token_key)
    username = jwt_get_username_from_payload(payload)
    try:
        return User.objects.get(email=username)
    except User.DoesNotExist:
        return AnonymousUser()

class JWTAuthMiddleWare(BaseMiddleware):
    """
    custom JWTAuthMiddleWare
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # print(self.scope)
        # headers = self.scope["headers"]

        # if b'Authorization' in headers:
        #     token_name, token_key = headers[b'Authorization'].decode().split()
        #     if token_name == "JWT":
        #         scope['user'] = await get_user(token_key)
        # else:
        #     scope["user"] = AnonymousUser()

        return await self.app(scope, receive, send)

