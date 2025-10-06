from rest_framework.pagination import PageNumberPagination, CursorPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class InfiniteScrollPagination(CursorPagination):
    """
    Cursor-based paginator for infinite scroll (modern UX).
    Keeps pagination stable even when data changes.
    """
    page_size = 10
    ordering = '-created_at'
    page_size_query_param = 'page_size'
    max_page_size = 50