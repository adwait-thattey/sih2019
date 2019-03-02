from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db import models
import os.path


# Create your models here.

def get_sheet_upload_path(instance, filename):
    return os.path.join('sheets', filename)


class Language(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Category(models.Model):
    parent_category = models.ForeignKey(to='self', on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        eng_name = self.categoryname_set.filter(language__name="english")
        if eng_name.exists():
            return eng_name[0].name
        else:
            return f'Category Unnamed'


class CategoryName(models.Model):
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=500, db_index=True)


class Sheet(models.Model):
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    file_loc = models.FileField(upload_to=get_sheet_upload_path, max_length=1000)


class SheetName(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class Feature(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    parent_feature = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)
    # start_year = models.IntegerField()
    is_property = models.BooleanField(default=False)

    def clean(self):
        if not (self.sheet or self.parent_feature):
            raise ValidationError("Every super column must have either a sheet or a parent column")

        if self.sheet and self.parent_feature:
            raise ValidationError("A super column can not have both parent and sheet")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        eng_name = self.featurename_set.filter(language__name="english")
        if eng_name.exists():
            return eng_name[0].name
        else:
            return f'Category Unnamed'


class FeatureName(models.Model):
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)

    # This is redundant, but is kept to speed up all queries


class Entity(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    parent_entity = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)
    parent_feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE, null=True, blank=True)

    # is_property = models.BooleanField(default=False)

    def clean(self):
        if not (self.sheet or self.parent_feature):
            raise ValidationError("Every super column must have either a sheet or a parent column")

        if self.sheet and self.parent_feature:
            raise ValidationError("A super column can not have both parent and sheet")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        eng_name = self.entityname_set.filter(language__name="english")
        if eng_name.exists():
            return eng_name[0].name
        else:
            return f'Category Unnamed'


class EntityName(models.Model):
    entity = models.ForeignKey(to=Entity, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class Type(models.Model):
    parent_type = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)


class TypeName(models.Model):
    type = models.ForeignKey(to=Type, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class FeatureRow(models.Model):
    type = models.ForeignKey(to=Type, on_delete=models.PROTECT)
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE)
    values = ArrayField(base_field=models.FloatField())
    start_year = models.IntegerField()


class Cell(models.Model):
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE)
    type = models.ForeignKey(to=Type, on_delete=models.PROTECT)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(null=True, blank=True)
    value = models.FloatField()

    class Meta:
        ordering = ['feature', 'start_year', 'end_year']
