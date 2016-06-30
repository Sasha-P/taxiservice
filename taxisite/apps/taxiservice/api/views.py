import time
from random import randrange
from rstr import xeger

from django.utils import timezone

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.taxiservice.models import Order
from .serializers import ClientSerializer


class TaxiOrderView(CreateAPIView):
    # queryset = Client.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):
        serializer = ClientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = serializer.validated_data['client']
        client.save()

        if client:
            delay = randrange(30)  # delay in seconds for real server simulation
            time.sleep(delay)
            is_car = False
            registration_plate = '-'
            if delay % 2 == 0:
                is_car = True
                registration_plate = xeger(r'[A-Z]{2} \d{4} [A-Z]{2}')

            if is_car:
                content = {
                    'is_car': True,
                    'registration_plate': registration_plate,
                    'will_be_in': delay
                }
            else:
                content = {
                    'is_car': False,
                    'no_car_msg': 'Not found any taxi in your area'
                }

            Order.objects.create(
                order_date=timezone.now(),
                registration_plate=registration_plate,
                client=client
            )
        else:
            content = {
                'is_error': True,
                # 'is_car': False,
                # 'no_car_msg': 'Not found any taxi in your area'
                'error': 'Oops'
            }

        return Response(content)
