# from rest_framework.views import APIView
from django.views import View
from django.shortcuts import get_object_or_404
import os
from django.http import FileResponse
from rest_framework.response import Response


from rest_framework import viewsets
from .models import Document
from .serializers import DocumentSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    


from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

class YourModelViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer  # Replace with your serializer class

    @action(detail=True, methods=['get'])
    def pdf_view(self, request, pk=None):
        instance = self.get_object()
        file_path = instance.file.path  # Replace with your field name

        try:
            with open(file_path, 'rb') as pdf_file:
                response = FileResponse(pdf_file)
                response['Content-Type'] = 'application/pdf'
                response['Content-Disposition'] = f'inline; filename="{instance.file.name}"'
                return response
        except FileNotFoundError:
            return Response(status=status.HTTP_404_NOT_FOUND)
