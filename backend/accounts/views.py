import requests
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_auth import views as auth_views
from accounts.serializers import (
    SignupSerializer,
    SuggestionSerializer,
    ProfilePageSerializer,
    ProfileEditSerializer,
    ProfileSerializer,
    UserSerializer,
    JWTSerializer,
)
from rest_framework.permissions import AllowAny

from accounts.models import Profile

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
User = get_user_model()

def KakaoException(Exception):
    pass


@api_view(["POST"])
@permission_classes([AllowAny])
def kakao_login(request):
    access_token = request.data.get("access_token")

    kakao_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    kakao_json = kakao_request.json()

    kakao_account = kakao_json.get("kakao_account")
    email = kakao_account.get("email", None)
    profile = kakao_account.get("profile", None)
    nickname = profile.get("nickname", None)
    avatar = profile.get("thumbnail_image_url", None)

    if not email:
       KakaoException()

    try:
        user_in_db = User.objects.get(email=email)
        user_in_db.profile.avatar = avatar

        payload = jwt_payload_handler(user_in_db)
        token = jwt_encode_handler(payload)
        username = user_in_db.username

    except User.DoesNotExist:
        new_user = User.objects.create(email=email)
        new_user.username = nickname
        new_user.set_unusable_password()
        new_user.profile = Profile.objects.create()
        new_user.profile.avatar = avatar
        new_user.save()

        payload = jwt_payload_handler(new_user)
        token = jwt_encode_handler(payload)
        username = nickname

    data = {
        "jwtToken" : token,
        "username" : username,
    }
    return Response(data, status=status.HTTP_200_OK)


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

class ChattingView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = SuggestionSerializer

    def get_queryset(self):
        now_user = self.request.user
        qs = super().get_queryset()
        qs = qs.exclude(pk=now_user.pk).filter(pk__in=now_user.following_set.all())
        return qs

class SuggestionView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = SuggestionSerializer

    def get_queryset(self):
        now_user = self.request.user
        qs = super().get_queryset()
        qs = qs.exclude(pk=now_user.pk).exclude(pk__in=now_user.following_set.all())
        return qs


class ProfilePageView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfilePageSerializer
    lookup_field = "username"


class ProfileEditView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileEditSerializer
    lookup_field = "username"


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
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
