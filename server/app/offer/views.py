from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

from .models import Offer, OfferImage
from .serializers import OfferSerializer, DealerOffersSerializer, DetailSerializer
from .paginations import CustomPagination

from dealer.models import Dealer
from dealer.serializers import DealerSerializer

order_list = {
    'price_min': 'price',
    'price_max': '-price',
    'latest': '-list_data',
    'oldest': 'list_data'
}

class DetailsViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = DetailSerializer

    def get_queryset(self):
        queryset = self.queryset
        detail_id = self.request.query_params.get('id')
        if detail_id:
            queryset = queryset.filter(id=detail_id)
        return queryset


class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all().filter(is_published=True)
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.request.query_params.get('dealer'):
            return DealerOffersSerializer
        return OfferSerializer

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(Offer, pk=pk)
        serializer = DetailSerializer(queryset, context={'request': request})
        return Response(serializer.data)

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        serializer = DealerOffersSerializer(page, many=True, context={'request': request})

        dealer_id = self.request.query_params.get('dealer')
        if dealer_id:
            dealer_queryset = Dealer.objects.filter(id=dealer_id)
            dealer_serializer = DealerSerializer(dealer_queryset, many=True, context={'request': request})
            return self.get_paginated_response({'offers': serializer.data, 'dealer': dealer_serializer.data[0]})

        return self.get_paginated_response({'offers': serializer.data})

    def get_queryset(self):
        queryset = self.queryset

        dealer = self.request.query_params.get('dealer')
        if dealer:
            queryset = queryset.filter(dealer=dealer)
        
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__name__iexact=category)

        cities = self.request.query_params.get('city')
        if cities:
            cities = cities.split(',')
            queryset = queryset.filter(city__iregex=r'(' + '|'.join(cities) + ')')

        sqm_min = self.request.query_params.get('sqm_min')
        if sqm_min:
            queryset = queryset.filter(sqm__gte=sqm_min)

        sqm_max = self.request.query_params.get('sqm_max')
        if sqm_max:
            queryset = queryset.filter(sqm__lte=sqm_max)

        price_min = self.request.query_params.get('price_min')
        if price_min:
            queryset = queryset.filter(price__gte=price_min)

        price_max = self.request.query_params.get('price_max')
        if price_max:
            queryset = queryset.filter(price__lte=price_max)

        rooms_min = self.request.query_params.get('rooms_min')
        if rooms_min:
            queryset = queryset.filter(rooms__gte=rooms_min)

        rooms_max = self.request.query_params.get('rooms_max')
        if rooms_max:
            queryset = queryset.filter(rooms__lte=rooms_max)
        rooms = self.request.query_params.get('rooms')


        orderby = self.request.query_params.get('orderby')
        if orderby and orderby in order_list:
            queryset = queryset.order_by(order_list[orderby])
        else:
            queryset = queryset.order_by('-list_data')

        return queryset
    

    @action(detail=False, url_path='latest')
    def get_latest(self, request):
        queryset = Offer.objects.all().order_by('-list_data')[:12]
        serializer = OfferSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, url_path='promotions')
    def get_promotions(self, request):
        queryset = Offer.objects.exclude(old_price__isnull=True).order_by('?')[:12]
        serializer = OfferSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

