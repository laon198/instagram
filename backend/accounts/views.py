from django.contrib.auth import get_user_model
from rest_framework import generics

from accounts.serializers import SignupSerializer
from rest_framework.permissions import AllowAny


User = get_user_model()


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
