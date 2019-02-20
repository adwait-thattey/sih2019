from django.contrib import admin

# Register your models here.

from .models import SuperSheet, Sheet, TableColumn, TableRows, SuperColumn

admin.site.register((
    SuperSheet,
    Sheet,
    TableColumn,
    TableRows,
    SuperColumn
))
