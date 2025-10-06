from django.shortcuts import get_object_or_404
from django.db.models import Count
from rest_framework import generics, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from .pagination import InfiniteScrollPagination


class PostListCreateView(generics.ListCreateAPIView):
    """GET: List all posts (filter, search, order, infinite scroll) | POST: Create post"""
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = InfiniteScrollPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'tags']
    search_fields = ['title', 'body', 'author__user__username']
    ordering_fields = ['created_at', 'likes_count', 'comments_count']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Post.objects.select_related('author__user')
            .prefetch_related('users_liked', 'comments')
            .annotate(
                likes_count=Count('users_liked', distinct=True),
                comments_count=Count('comments', distinct=True),
            )
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET: View post | PUT/PATCH: Edit | DELETE: Remove (author only)"""
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return (
            Post.objects.select_related('author__user')
            .prefetch_related('users_liked', 'comments')
            .annotate(
                likes_count=Count('users_liked', distinct=True),
                comments_count=Count('comments', distinct=True),
            )
        )

    def perform_update(self, serializer):
        if self.request.user.profile != serializer.instance.author:
            raise PermissionDenied("You can only edit your own posts.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.profile != instance.author:
            raise PermissionDenied("You can only delete your own posts.")
        instance.delete()


class PostLikeView(APIView):
    """Toggle like/unlike on a post"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        profile = request.user.profile

        if post.users_liked.filter(pk=profile.pk).exists():
            post.users_liked.remove(profile)
            liked = False
        else:
            post.users_liked.add(profile)
            liked = True

        return Response(
            {"liked": liked, "likes_count": post.users_liked.count()},
            status=status.HTTP_200_OK
        )


class MyPostsView(generics.ListAPIView):
    """GET: List posts created by the current logged-in user (infinite scroll)"""
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = InfiniteScrollPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'likes_count']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Post.objects.filter(author=self.request.user.profile)
            .annotate(likes_count=Count('users_liked', distinct=True))
            .order_by('-created_at')
        )


class CommentListView(generics.ListAPIView):
    """GET: List all comments for a post (infinite scroll)"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = InfiniteScrollPagination

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        return (
            Comment.objects.filter(post_id=post_id, parent__isnull=True, is_deleted=False)
            .select_related('author__user', 'post')
            .prefetch_related('users_liked', 'replies')
            .order_by('-created_at')
        )


class CommentCreateView(generics.CreateAPIView):
    """POST: Add a comment or reply to a post"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get("post_id")
        parent_id = self.request.data.get("parent_id")

        post = get_object_or_404(Post, pk=post_id)
        parent = Comment.objects.filter(pk=parent_id).first() if parent_id else None

        serializer.save(author=self.request.user.profile, post=post, parent=parent)


class CommentLikeView(APIView):
    """Toggle like/unlike on a comment"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)
        profile = request.user.profile

        if comment.users_liked.filter(pk=profile.pk).exists():
            comment.users_liked.remove(profile)
            liked = False
        else:
            comment.users_liked.add(profile)
            liked = True

        return Response(
            {"liked": liked, "likes_count": comment.users_liked.count()},
            status=status.HTTP_200_OK
        )
