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

