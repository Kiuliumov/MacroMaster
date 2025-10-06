from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


class PostListCreateView(generics.ListCreateAPIView):
    """GET: List all posts | POST: Create a new post"""
    queryset = Post.objects.select_related('author__user').prefetch_related('users_liked', 'comments')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET: View post | PUT/PATCH: Edit post | DELETE: Remove post"""
    queryset = Post.objects.select_related('author__user').prefetch_related('comments')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
        post = Post.objects.get(pk=pk)
        profile = request.user.profile
        if post.users_liked.filter(pk=profile.pk).exists():
            post.users_liked.remove(profile)
            liked = False
        else:
            post.users_liked.add(profile)
            liked = True
        return Response({
            "liked": liked,
            "likes_count": post.users_liked.count(),
        }, status=status.HTTP_200_OK)


class CommentCreateView(generics.CreateAPIView):
    """POST: Add a comment to a post"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get("post_id")
        parent_id = self.request.data.get("parent_id")

        post = Post.objects.get(pk=post_id)
        parent = Comment.objects.filter(pk=parent_id).first() if parent_id else None

        serializer.save(author=self.request.user.profile, post=post, parent=parent)

class CommentListView(generics.ListAPIView):
    """GET: List all comments for a given post"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        return Comment.objects.filter(post_id=post_id, parent__isnull=True, is_deleted=False).order_by('-created_at')


class CommentLikeView(APIView):
    """Toggle like/unlike on a comment"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        profile = request.user.profile
        if comment.users_liked.filter(pk=profile.pk).exists():
            comment.users_liked.remove(profile)
            liked = False
        else:
            comment.users_liked.add(profile)
            liked = True
        return Response({
            "liked": liked,
            "likes_count": comment.users_liked.count(),
        }, status=status.HTTP_200_OK)


class MyPostsView(generics.ListAPIView):
    """GET: List the posts created by the logged-in user"""
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user.profile).order_by('-created_at')
