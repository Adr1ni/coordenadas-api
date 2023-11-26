from djongo import models
# import datetime

class Coordenadas(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    lat = models.DecimalField(max_digits=100, decimal_places=15)
    lng = models.DecimalField(max_digits=100, decimal_places=15)
    # chofer_id = models.IntegerField(default=0)
    # empresa_id = models.IntegerField(default=0)
    # date_created = models.DateTimeField(default=datetime.datetime.now())

    def __str__(self) -> str:
        return f"{self.lat} , {self.lng}"    # return f"{self.id} : {self.latitude} , {self.longitude}"
