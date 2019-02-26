from django.urls import path
from . import views

app_name = "sheets"

urlpatterns = [
    path('feature_values', views.get_feature, name="feature_values"),
]
