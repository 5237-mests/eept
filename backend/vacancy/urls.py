# from django.urls import path
# from vacancy.views import index

# urlpatterns = [
#     # path('upload/', FileUploadView.as_view(), name='file-upload'),
#     path('index/', index, name='index'),
# ]

from django.urls import re_path, include, path
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from .views import DocumentViewSet, YourModelViewSet

router = DefaultRouter()
router.register(r'file', DocumentViewSet, basename='filem')
# router.register(r'pdf/<int:pk>/', PdfView)
router.register(r'files', YourModelViewSet)


urlpatterns = [
    re_path(r'^', include(router.urls)),
    # path('pdf/<int:pk>/', pdf_view, name='pdf-view'),
]
