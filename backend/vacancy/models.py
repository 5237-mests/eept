from django.db import models

# Create your models here.
class Document(models.Model):
  title = models.CharField(max_length=255, blank=True)
  file = models.FileField(upload_to='documents/')

  def __str__(self):
    return self.title


