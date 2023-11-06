"""online_exam URL Configuration

The `urlpatterns` list routes URLs to views.

"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path("auth/", include('users.urls')),
    path('admin/', admin.site.urls),
    path("", include('questions.urls')),
    path("api-auth/",
         include("rest_framework.urls", namespace="rest_framework")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("api/", include("vacancy.urls")),
]

# urlpatterns += [re_path(r'^.*',
# TemplateView.as_view(template_name='index.html'))]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
