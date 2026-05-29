from django.db import models


class Meeting(models.Model):

    title = models.CharField(max_length=100)

    date = models.DateField()

    notes = models.TextField()

    def __str__(self):
        return self.title
