from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter

from dealer.views import DealerViewSet
from offer.views import OfferViewSet, DetailsViewSet

# app_name = 'app'

router = DefaultRouter()
router.register('dealers', DealerViewSet)
router.register('offers', OfferViewSet)
# router.register('detail', DetailsViewSet, basename='detail')

urlpatterns = [
    path('api/', include(router.urls)),
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
