from django.shortcuts import render

from rest_framework import viewsets

from .models import Dealer
from .serializers import DealerSerializer


class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all().order_by('?')
    serializer_class = DealerSerializer
