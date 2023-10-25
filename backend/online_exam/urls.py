"""online_exam URL Configuration

The `urlpatterns` list routes URLs to views.

"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path("auth/", include('users.urls')),
    path('admin/', admin.site.urls),
    path("", include('questions.urls')),
    # path("", include('home.urls')),
    path("api-auth/",
         include("rest_framework.urls", namespace="rest_framework")),
    path("accounts/", include("django.contrib.auth.urls")),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]