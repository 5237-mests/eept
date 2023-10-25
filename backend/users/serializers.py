from rest_framework.serializers import ModelSerializer
from .models import ActivationTokenGenerator
from questions.serializer import EmployeeSerializer


class ActivationTokenSerializer(ModelSerializer):
    user = EmployeeSerializer()

    class Meta:
        model = ActivationTokenGenerator
        fields = ("token", "user")
