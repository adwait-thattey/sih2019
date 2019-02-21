from django.core.exceptions import ValidationError
from django.db import models
import os.path


# Create your models here.

def get_sheet_upload_path(instance, filename):
    return os.path.join('sheets', filename)


class Language(models.Model):
    name = models.CharField(max_length=100)


class SuperSheet(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)


class Sheet(models.Model):
    supersheet = models.ForeignKey(to=SuperSheet, on_delete=models.PROTECT, null=True, blank=True)
    file = models.FileField(upload_to=get_sheet_upload_path)


class SheetName(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE,null=True,blank=True)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class SuperColumn(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    parent_column = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)

    def clean(self):
        if not (self.sheet or self.parent_column):
            raise ValidationError("Every super column must have either a sheet or a parent column")

        if self.sheet and self.parent_column:
            raise ValidationError("A super column can not have both parent and sheet")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class TableColumn(models.Model):
    super_column = models.ForeignKey(to=SuperColumn, on_delete=models.CASCADE)
    column_number = models.PositiveIntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.column_number:
            self.column_number = TableColumn.objects.filter(sheet=self.super_column).count()
            self.save()


class ColumnName(models.Model):
    column = models.ForeignKey(to=TableColumn, on_delete=models.CASCADE,null=True,blank=True)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class Category(models.Model):
    super_category = models.ForeignKey(to='self', on_delete=models.CASCADE)


class CategoryName(models.Model):
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class TableRows(models.Model):
    column = models.ForeignKey(to=TableColumn, on_delete=models.CASCADE)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(null=True, blank=True)
    value = models.DecimalField(max_digits=14, decimal_places=4)

    class Meta:

        ordering = ['column', 'start_year', 'end_year']
