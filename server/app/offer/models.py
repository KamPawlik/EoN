from django.db import models
from datetime import datetime
from dealer.models import Dealer

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Offer(models.Model):
    dealer = models.ForeignKey(Dealer, on_delete=models.DO_NOTHING, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    old_price = models.IntegerField(blank=True, null=True)
    price = models.IntegerField()
    rooms = models.IntegerField()
    parking_places = models.IntegerField(default=0)
    sqm = models.IntegerField()
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    is_published = models.BooleanField(default=True)
    list_data = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title

class OfferImage(models.Model):
    offer = models.ForeignKey(Offer, related_name='offer_images', default=None, on_delete=models.CASCADE)
    images = models.ImageField(upload_to='photos/%Y/%m/%d/')

    def __str__(self):
        return self.images.url