from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .models import Order


def index(request):
    return render(request, 'taxiservice/index.html')


@login_required
def statistic(request):
    orders = Order.objects.all()
    return render(request, 'taxiservice/statistic.html', {'orders': orders})
