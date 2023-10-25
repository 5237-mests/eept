from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from uuid import uuid4


class CustomuserManger(UserManager):
    """Custom create and update"""
    def create_user(self, username, email, password, first_name, **kwargs):
        email = self.normalize_email(email)
        user = self.model(email=email,
                          username=username,
                          first_name=first_name, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,
                         username, email, password,
                         first_name, **kwargs):
        kwargs["is_active"] = True
        kwargs["is_superuser"] = True
        kwargs["is_staff"] = True
        user = self.create_user(username,
                                email, password,
                                first_name, **kwargs)
        return user


class Employee(AbstractUser):
    """Custom Auth Users (Employee models)"""
    username = models.CharField(
        _("Username"), max_length=255, null=False, unique=True, blank=False)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    middlename = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    date_joined = models.DateTimeField(_("Date joined"), default=timezone.now)
    curposition = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=255, null=False, blank=False)
    is_active = models.BooleanField(default=False)
    # used on authenticate // login
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password", "first_name", "email"]
    objects = CustomuserManger()

    def __str__(self) -> str:
        return f"{self.username} - {self.first_name}"


class ActivationTokenGenerator(models.Model):
    """Generate activation token"""
    token = models.UUIDField(unique=True,
                             primary_key=True,
                             null=False, default=uuid4)
    user = models.ForeignKey(Employee, on_delete=models.CASCADE)
