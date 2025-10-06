from django.urls import path
from .views import (
    PostListCreateView, PostDetailView, PostLikeView,
    CommentCreateView, CommentListView, CommentLikeView,
    MyPostsView
)

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list'),
    path('posts/my/', MyPostsView.as_view(), name='my-posts'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/like/', PostLikeView.as_view(), name='post-like'),

    path('posts/<int:post_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('posts/<int:post_id>/comments/add/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/like/', CommentLikeView.as_view(), name='comment-like'),
]
