from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.serializers import (
    SignupSerializer,
    SuggestionSerializer,
    ProfileSerializer,
)
from rest_framework.permissions import AllowAny


User = get_user_model()


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]


class SuggestionView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = SuggestionSerializer

    def get_queryset(self):
        now_user = self.request.user
        qs = super().get_queryset()
        qs = qs.exclude(username=now_user).exclude(pk__in=now_user.following_set.all())
        return qs


class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "username"


@api_view(["POST"])
def followView(request):
    username = request.data["username"]
    now_user = request.user
    follow_user = generics.get_object_or_404(User, username=username)
    now_user.following_set.add(follow_user)
    follow_user.follower_set.add(now_user)
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def unFollowView(request):
    username = request.data["username"]
    now_user = request.user
    unfollow_user = generics.get_object_or_404(User, username=username)
    now_user.following_set.remove(unfollow_user)
    unfollow_user.follower_set.remove(now_user)
    return Response(status.HTTP_204_NO_CONTENT)
