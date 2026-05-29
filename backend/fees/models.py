from django.db import models


class Fee(models.Model):

    member_name = models.CharField(max_length=100)

    amount = models.IntegerField()

    status = models.CharField(max_length=20)

    def __str__(self):
        return self.member_name
