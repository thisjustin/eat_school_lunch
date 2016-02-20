from django.conf.urls import url, include
from school_lunch.api.views import CoreApplicationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'core_applications', CoreApplicationViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]