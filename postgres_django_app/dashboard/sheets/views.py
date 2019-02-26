from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404
from sheets import objects
from . import utils
from . import models


# Create your views here.

def get_feature(request):
    feature_id = request.GET.get('feature', None)
    lang_name = request.GET.get('language', None)
    depth = int(request.GET.get('depth', 0))

    if not (feature_id and lang_name):
        raise Http404("Insufficient parameters")

    feature = get_object_or_404(models.Feature, id=feature_id)
    lang = get_object_or_404(models.Language, name=lang_name.lower())

    obj = utils.get_feature_python_object(feature, lang, depth)

    print(obj)
    return JsonResponse(obj)
