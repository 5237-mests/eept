"""
Authentication urls
"""
from django.urls import path
from .views import (LoginAPIView,
                    get_csrftoken,
                    logoutAPIView,
                    UserDetalView,
                    ActivateUserAPIView,
                    PasswordRestRequestAPIView,
                    PasswordResetDoneAPIView,
                    )


urlpatterns = [
    path("getcsrf/", get_csrftoken.as_view()),  # Get CSRFTOKEN
    path("login", LoginAPIView),  # Authenticate login and send sessionid
    path("logout/", logoutAPIView),  # logout session
    path("users/me/<str:username>/", UserDetalView.as_view()),
    path("activate/<username>/<token>/", ActivateUserAPIView.as_view()),
    path("reset-password/", PasswordRestRequestAPIView.as_view()),
    path("reset-password-done/", PasswordResetDoneAPIView.as_view()),
]
