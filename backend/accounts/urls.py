from django.urls import path

from accounts import views
from rest_framework_jwt.views import obtain_jwt_token

app_name = "accounts"

urlpatterns = [
    path("signup/", views.SignupView.as_view(), name="signup"),
    path("login/", obtain_jwt_token, name="login"),
    path("suggestion/", views.SuggestionView.as_view(), name="suggestion"),
    path("follow/", views.followView, name="follow"),
    path("unfollow/", views.unFollowView, name="unfollow"),
    path("profile/<int:pk>/", views.ProfileView.as_view(), name="profile"),
    path(
        "profile/<str:username>/", views.ProfilePageView.as_view(), name="profile_page"
    ),
    path(
        "profile/<str:username>/edit/",
        views.ProfileEditView.as_view(),
        name="profile_edit",
    ),
]
