from django.urls import path
from . import views

app_name = "sheets"

urlpatterns = [
    path('feature_values', views.get_feature, name="feature_values"),
    path('feature_name_tree', views.get_feature_name_tree, name="feature_name_tree"),
    path('feature_search_list', views.get_feature_search_list, name="feature_search_list")

]
