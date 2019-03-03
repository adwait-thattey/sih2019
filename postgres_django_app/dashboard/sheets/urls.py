from django.urls import path
from . import views

app_name = "sheets"

urlpatterns = [
    path('feature_values', views.get_feature, name="feature_values"),
    path('feature_name_tree', views.get_feature_name_tree, name="feature_name_tree"),
    path('feature_search_list', views.get_feature_search_list, name="feature_search_list"),
    path('agriculture', views.get_agriculture_data_view, name="agriculture_view"),
    path('ajax/agriculture/', views.get_agriculture_data, name="ajax_agriculture"),
    path('ajax/gva/', views.get_gva, name="get_gva"),
    path('aggregate/<slug:agg_name>/', views.agg_name ,name='agg_name'),
    path('activity/<slug:acc_name>/' , views.acc_name, name='acc_name'),
    path('aggregate/<slug:agg_name>/<slug:activity_name>/', views.agg_name_deep, name='agg_name_deep'),
    path('get_gdp/', views.get_gdp, name="get_gdp"),
    path('get_gva_shares/', views.get_gva_shares, name="get_gva_shares")
]
