from django.urls import path

from accounts import views
from rest_auth import views as auth_views

app_name = "accounts"

urlpatterns = [
    # kakao login
    path('login/kakao/', views.kakao_login, name='kakao_login'),
    # default login
    path("login/", auth_views.LoginView.as_view(), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),

    path("signup/", views.SignupView.as_view(), name="signup"),
    # path("login/", obtain_jwt_token, name="login"),
    path("suggestion/", views.SuggestionView.as_view(), name="suggestion"),
    path("follow/", views.followView, name="follow"),
    path("unfollow/", views.unFollowView, name="unfollow"),
    path("<str:username>/", views.UserView.as_view(), name="my"),
    path(
        "profile/<str:username>/", views.ProfilePageView.as_view(), name="profile_page"
    ),
    path(
        "profile/<str:username>/edit/",
        views.ProfileEditView.as_view(),
        name="profile_edit",
    ),
]
