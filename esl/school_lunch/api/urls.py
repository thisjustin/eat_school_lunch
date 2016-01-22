from django.conf.urls import url, patterns, include
from school_lunch.api.views import CoreApplicationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'core_applications', CoreApplicationViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    # url(r'^core_applications/(?P<app_id>\d+)/child/$', ),
    # url(r'^core_applications/(?P<app_id>\d+)/adult/$', ),
)