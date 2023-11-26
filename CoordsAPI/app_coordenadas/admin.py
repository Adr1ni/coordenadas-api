from django.contrib import admin
from .models import Coordenadas
import datetime

class CoordenadasAdmin(admin.ModelAdmin):
    actions = ['update_date_time']

    def update_date_time(self, request, queryset):
        queryset.update(date_created=datetime.datetime.now())

    update_date_time.short_description = "Cambiar la fecha de creación al actual."

# Register your models here.
admin.site.register(Coordenadas, CoordenadasAdmin)