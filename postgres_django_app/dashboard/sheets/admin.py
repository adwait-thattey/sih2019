from django.contrib import admin

# Register your models here.

from .models import Language, Category, CategoryName, Sheet, SheetName, Feature, FeatureName, Type, TypeName, Cell

admin.site.register((
    Language,
    Category,
    CategoryName,
    Sheet,
    SheetName,
    FeatureName,
    Feature,
    Type,
    TypeName,
    Cell
))
