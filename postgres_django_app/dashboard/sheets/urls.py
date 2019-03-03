from django.urls import path
from . import views

app_name = "sheets"

urlpatterns = [
    path('feature_values', views.get_feature, name="feature_values"),
    path('upload', views.view_uploaded_filelist, name="reupload_view"),
    path('upload-response', views.file_reupload_ajax, name="reupload_view"),

    path('feature_name_tree', views.get_feature_name_tree, name="feature_name_tree"),
    path('feature_search_list', views.get_feature_search_list, name="feature_search_list")

]
