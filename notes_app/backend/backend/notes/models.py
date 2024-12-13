from django.db import models
from users.models import User

class Note(models.Model):
    title = models.CharField(max_length=180)
    desc = models.TextField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    audio = models.FileField(upload_to='notes_audio/', null=True, blank=True)  # New field for audio

    def __str__(self):
        return self.title
