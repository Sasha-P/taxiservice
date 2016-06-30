from rest_framework import serializers

from apps.taxiservice.models import Client


class ClientSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone_number = serializers.CharField()

    def validate(self, attrs):
        name = attrs['name']
        phone_number = attrs['phone_number']

        clients = Client.objects.filter(phone_number=phone_number)

        if clients.count():
            client = clients[0]
        else:
            client = Client(
                name=name,
                phone_number=phone_number,
            )

        attrs['client'] = client
        return attrs
