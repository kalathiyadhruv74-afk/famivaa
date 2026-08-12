from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def robots_txt(request):
    content = "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /django-admin/\nSitemap: http://localhost:3000/sitemap.xml\n"
    return HttpResponse(content, content_type="text/plain")

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('robots.txt', robots_txt),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
