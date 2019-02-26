from django.shortcuts import render, get_object_or_404
from sheets import objects
from . import utils
from . import models


# Create your views here.

def get_feature(request, feature_id, lang_name):
    feature = get_object_or_404(models.Feature, id=feature_id)
