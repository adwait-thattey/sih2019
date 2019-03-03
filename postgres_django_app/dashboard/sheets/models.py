from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db import models, IntegrityError
import os.path

# Create your models here.

FEATURE_LIST = ['final expenditure', 'export of services', 'gross value added', 'gcf to gdp', 'cis', 'ce', 'gcf  excluding valuables to gdp', 'import of services.1', 'gva by economic activity', 'gcf', 'net value added', 'intermediate consumption', 'percentage share of gva by economic activity', 'export of goods', 'pfce', 'gfce.1', 'gdp.1', 'gva to output ratio', 'total gva at basic prices', 'input', 'directly available', 'fisim', 'valuables', 'percentage change over previous year', 'gva at basic prices', 'gva at basic prices', 'primary income receivable from row (net)', 'gva at basic prices.1', 'nndi(18-5)', 'gfcf', 'discrepancies', 'nva at basic prices', 'rates', 'gross capital formation', 'nni (15-5)', 'cfc', 'valuables', 'gfcf', 'domestic product', 'gdp (1+2-3)', 'export of goods and services', 'production taxes less production subsidies', 'gcf to output ratio', 'other current transfers (net) from row', 'export of goods.1', 'discrepancies.1', 'cfc', 'nva by economic activity', 'pfce.1', 'ndp(4-5)', 'gross saving', 'gdp', 'total nva at basic prices', 'rates of expenditure components to gdp', 'less import of goods and services', 'derived from national accounts (implicit)', 'import of goods', 'gfce', 'gni(13+14)', 'exports of goods and services', 'gndi(15+17)', 'net saving', 'export of services.1', 'taxes on products including import duties', 'cis', 'less imports of goods and services', 'value of output', 'os/mi', 'import of goods.1', 'import of services', 'less subsidies on products', 'output', 'gross saving to gndi', 'pfce to nni']



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
    meta_file_loc = models.FileField(upload_to=get_sheet_upload_path, max_length=10000)

    def __str__(self):
        eng_name = self.sheetname_set.filter(language__name="english")
        if eng_name.exists():
            return eng_name[0].name
        else:
            return f'Category Unnamed'

    def english_name(self):
        return self.sheetname_set.filter(language__name="english")[0].name


class SheetName(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        if self.language.name == "english":
            self.name = self.name.lower()

        super().save(*args, **kwargs)


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

    def english_name(self):
        return self.featurename_set.filter(language__name="english")[0].name


class FeatureName(models.Model):
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)

    # This is redundant, but is kept to speed up all queries

    def save(self, *args, **kwargs):
        if self.language.name == "english":
            self.name = self.name.lower()

        super().save(*args, **kwargs)


class Entity(models.Model):
    sheet = models.ForeignKey(to=Sheet, on_delete=models.CASCADE, null=True, blank=True)
    parent_entity = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)
    parent_feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE, null=True, blank=True)

    # is_property = models.BooleanField(default=False)

    def clean(self):
        if not (self.sheet or self.parent_entity):
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

    def english_name(self):
        return self.entity_set.filter(language__name="english")[0].name


class EntityName(models.Model):
    entity = models.ForeignKey(to=Entity, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        if self.language.name == "english":
            self.name = self.name.lower()

        if self.name == "constant":
            raise ValueError()

        super().save(*args, **kwargs)


class Type(models.Model):
    parent_type = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        eng_name = self.typename_set.filter(language__name="english")
        if eng_name.exists():
            return eng_name[0].name
        else:
            return f'Type Unnamed'

    def english_name(self):
        return self.typename_set.filter(language__name="english")[0].name


class TypeName(models.Model):
    type = models.ForeignKey(to=Type, on_delete=models.CASCADE)
    language = models.ForeignKey(to=Language, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        if self.language.name == "english":
            self.name = self.name.lower()
        super().save(*args, **kwargs)


class FeatureRow(models.Model):
    type = models.ForeignKey(to=Type, on_delete=models.CASCADE, null=True, blank=True)
    entity = models.ForeignKey(to=Entity, on_delete=models.CASCADE)
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE, null=True, blank=True)
    values = ArrayField(base_field=models.FloatField())
    start_year = models.IntegerField()

    class Meta:
        unique_together = ['feature', 'entity', 'type']

    def save(self, *args, **kwargs):
        try:
            super().save(*args, **kwargs)
        except IntegrityError:
            fr = FeatureRow.objects.get(type=self.type, entity=self.entity, feature=self.feature)
            fr.start_year = self.start_year
            fr.values = self.values
            fr.save()
            print("Integrity error. Duplicate entry.", self.type, self.entity, self.feature)


class Cell(models.Model):
    feature = models.ForeignKey(to=Feature, on_delete=models.CASCADE)
    type = models.ForeignKey(to=Type, on_delete=models.PROTECT)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(null=True, blank=True)
    value = models.FloatField()

    class Meta:
        ordering = ['feature', 'start_year', 'end_year']



MAIN_ATTRIBUTE_MAPPING = {
    "gva":"total gva at basic prices",
    "gdp":" ",
    "gfcf":"",
    "gcf":"",
    "ncs":"",
    "nva":"",
}