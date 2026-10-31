from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "Cabinet BMC — Administration"
admin.site.site_title = "Cabinet BMC"
admin.site.index_title = "Tableau de bord"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/services/", include("apps.services.urls")),
    path("api/v1/enterprises/", include("apps.enterprises.urls")),
    path("api/v1/talents/", include("apps.talents.urls")),
    path("api/v1/academy/", include("apps.academy.urls")),
    path("api/v1/blog/", include("apps.blog.urls")),
    path("api/v1/portfolio/", include("apps.portfolio.urls")),
    path("api/v1/contact/", include("apps.contact.urls")),
    path("api/v1/diagnostic/", include("apps.diagnostic.urls")),
    path("api/v1/core/", include("apps.core.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
