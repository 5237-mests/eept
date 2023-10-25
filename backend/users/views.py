import json
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from users.models import Employee
from questions.serializer import EmployeeSerializer
from rest_framework.response import Response
from .models import ActivationTokenGenerator
from django.shortcuts import render
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import SendPasswordResetEmail
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework import permissions


# def get_csrftoken(request):
#     """Get CSRF Token"""
#     # resp = JsonResponse({"csrftoken": get_token(request)})
#     return JsonResponse({"success": "ok"})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class get_csrftoken(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        return JsonResponse({"success": "csrf cookie set"})


# class LoginAPIView(generics.GenericAPIView):
#     """Login view"""
#     @require_POST
#     def LoginAPIView(request):
#         """Authenicate  login and give session id to user up on login"""
#         data = json.loads(request.body)
#         username = data.get("username")
#         password = data.get("password")
#         if username and password:
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 login(request, user)  # generate session_id
#                 return JsonResponse(
#                     {"status": "logged in"}, status=status.HTTP_200_OK)
#         return JsonResponse(
#             {"status": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@require_POST
def LoginAPIView(request):
    """Authenicate  login and give session id to user up on login"""
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")
    if username and password:
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)  # generate session_id
            return JsonResponse(
                {"status": "logged in"}, status=status.HTTP_200_OK)
    return JsonResponse(
        {"status": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)





def logoutAPIView(request):
    """Log out user"""
    logout(request)
    return JsonResponse({"status": "OK"}, status=status.HTTP_200_OK)


class UserDetalView(generics.RetrieveUpdateAPIView):
    """User Detail and update view"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = Employee.objects.all()

    def get(self, request, *args, **kwargs):
        """ override get method to use username"""
        user = Employee.objects.filter(username=kwargs["username"]).first()
        if not user:
            return Response({"statu": "Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """ override update method"""
        instance = Employee.objects.filter(
            username=request.data.get("username")).first()
        if not instance:
            return Response({"status": "Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
        instance.first_name = request.data.get("first_name",
                                               instance.first_name)
        instance.last_name = request.data.get("last_name",
                                              instance.last_name)
        instance.middlename = request.data.get("middlename",
                                               instance.middlename)
        instance.curposition = request.data.get("curposition",
                                                instance.curposition)
        instance.email = request.data.get("email",
                                          instance.email)
        instance.save()
        serialzer = EmployeeSerializer(instance)
        return Response(serialzer.data, status=status.HTTP_200_OK)


class ActivateUserAPIView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        uid = kwargs.get("username")
        tk = kwargs.get("token")
        token_obj = ActivationTokenGenerator.objects.filter(token=tk).first()
        if token_obj:
            user = Employee.objects.filter(username=uid).first()
            user.is_active = True
            user.save()
            return render(request, "activate.html", {"status": "success"})
        return render(request, "activate.html", {"status": "error"})


class PasswordRestRequestAPIView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        user = Employee.objects.filter(username=username).first()
        if not user:
            return Response(
                {"status": "Password Reset Link Sent to your Email!"},
                status=status.HTTP_200_OK)
        token = PasswordResetTokenGenerator().make_token(user=user)
        # this token hash some values that may change ! las Token expire !
        data = {"token": token,
                "user_id": user.username,
                "firstname": user.first_name,
                "email": user.email}
        SendPasswordResetEmail(data)
        return Response({"status": "success"}, status=status.HTTP_200_OK)


class PasswordResetDoneAPIView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        token = request.data.get("code")
        user = Employee.objects.filter(username=username).first()
        if not user:
            return Response(
                {"status": "User Not found"},
                status=status.HTTP_200_OK)
        stat = PasswordResetTokenGenerator().check_token(
            user=user, token=token)
        if stat:
            user.set_password(password)  # save hashed data
            user.save()
            return Response(
                {"status": "Password changed successfully!"},
                status=status.HTTP_200_OK)
        return Response({"status": "Token invalid!"},
                        status=status.HTTP_200_OK)
