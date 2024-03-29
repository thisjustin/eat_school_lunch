"""esl URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.http import HttpResponse
from esl.views import HomeView, ApplyView, SuccessView


urlpatterns = [
    # simple way to block all robots
    url(r'^robots.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: /", content_type="text/plain")),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('school_lunch.api.urls')),
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^apply', ApplyView.as_view(), name='apply'),
    url(r'^success', SuccessView.as_view(), name='success'),
]


admin.site.site_header = 'Eat School Lunch Admin'
admin.site.site_title = 'Eat School Lunch Admin'