from __future__ import unicode_literals

from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Client(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name + '(' + self.phone_number + ')'

    class Meta:
        ordering = ['name']


@python_2_unicode_compatible
class Order(models.Model):
    order_date = models.DateTimeField()
    registration_plate = models.CharField(max_length=10)
    client = models.ForeignKey(Client)

    def __str__(self):
        return str(self.order_date) + '-' + self.registration_plate + '-' + str(self.client)

    class Meta:
        ordering = ['order_date']
