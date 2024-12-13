from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'desc', 'created_at', 'audio']

    def create(self, validated_data):
        note = Note(
            title=validated_data['title'],
            desc=validated_data['desc'],
            author=validated_data['author'],
            audio=validated_data.get('audio')  # Save audio if provided
        )
        note.save()
        return note

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.desc = validated_data.get('desc', instance.desc)
        if 'audio' in validated_data:
            instance.audio = validated_data['audio']  # Update audio file if provided
        instance.save()
        return instance
