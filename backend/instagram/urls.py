from django.urls import path, include
from rest_framework.routers import DefaultRouter
from instagram.views import PostViewSet

router = DefaultRouter()
router.register("post", PostViewSet)

app_name = "instagram"

urlpatterns = [
    path('api/', include(router.urls)),
]