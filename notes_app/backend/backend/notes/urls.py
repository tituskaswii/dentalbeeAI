from django.urls import path
from . import views

app_name = 'notes'

# api/v1/notes/

urlpatterns = [
    path('', views.notes, name='notes'),  # Handles GET, POST requests
    path('<int:id>/', views.notes, name='notes_update'),  # Handles PUT requests for updating a specific note
    path('delete/<int:id>/', views.notes_remove, name='notes_remove'),  # Handles DELETE requests for a specific note
]