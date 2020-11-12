from django.urls import path

from accounts import views
from rest_framework_jwt.views import obtain_jwt_token

app_name = "accounts"

urlpatterns = [
    path("signup/", views.SignupView.as_view(), name="signup"),
    path("login/", obtain_jwt_token, name="login"),
]
