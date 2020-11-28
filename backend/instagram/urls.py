from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from instagram.views import PostViewSet, CommentViewSet

router = routers.SimpleRouter()
router.register("post", PostViewSet)

comment_router = routers.NestedSimpleRouter(router, "post", lookup="post")
comment_router.register("comment", CommentViewSet)

app_name = "instagram"

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/", include(comment_router.urls)),
]
