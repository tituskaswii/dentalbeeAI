from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # Import settings to access MEDIA_URL and MEDIA_ROOT
from django.conf.urls.static import static  # Import static to serve media files in development

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/notes/', include('notes.urls')),  # Notes app routes
    path('api/v1/users/', include('users.urls')),  # Users app routes
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
