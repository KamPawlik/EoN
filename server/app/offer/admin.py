from django.contrib import admin

from .models import  Offer, OfferImage, Category

class OfferImageAdmin(admin.StackedInline):
    model = OfferImage
    extra = 0
    max_num = 11

class OfferAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'old_price', 'price', 'list_data', 'dealer')
    list_display_links = ('id', 'title')
    list_filter = ('dealer',)
    list_editable = ('is_published',)
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
    list_per_page = 25
    inlines = [OfferImageAdmin]

admin.site.register(Offer, OfferAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Category, CategoryAdmin)
