from django.conf.urls import url

from . import views
from .api import views as api_views

app_name = 'taxiservice'
urlpatterns = [
    url(r'^taxiorder/', api_views.TaxiOrderView.as_view()),

    url(r'^$', views.index, name='index'),
    url(r'^statistic/$', views.statistic, name='statistic'),
]