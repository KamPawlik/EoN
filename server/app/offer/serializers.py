from rest_framework import serializers

from .models import Offer, OfferImage
from dealer.models import Dealer
from dealer.serializers import DealerSerializer


class OfferSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Offer
        fields = (
            'id', 'category', 'title', 'address', 'city', 'zipcode', 'description', 'old_price',
            'price', 'photo_main', 'rooms', 'sqm', 'list_data', 'dealer')
        read_only_fields = ('id',)

class DealerOffersSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Offer
        fields = (
            'id', 'dealer', 'category', 'title', 'address', 'city', 'zipcode', 'description', 'old_price',
            'price', 'photo_main', 'rooms', 'sqm', 'list_data',)
        read_only_fields = ('id',)


class DetailSerializer(serializers.ModelSerializer):
    offer_images = serializers.StringRelatedField(many=True)
    category = serializers.StringRelatedField()
    dealer = DealerSerializer()

    class Meta:
        model = Offer
        fields = (
            'id', 'dealer', 'category', 'title', 'address', 'city', 'state', 'zipcode', 'description', 'old_price',
            'price', 'photo_main', 'list_data', 'rooms', 'parking_places', 'sqm', 'is_published', 'offer_images')
        read_only_fields = ('id',)
