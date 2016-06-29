from django.conf.urls import url

from . import views

app_name = 'taxiservice'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^statistic/$', views.statistic, name='statistic'),
]