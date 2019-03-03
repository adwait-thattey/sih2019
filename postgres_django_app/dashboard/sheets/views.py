from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404
from sheets import objects
from . import utils
from . import models


# Create your views here.

def view_uploaded_filelist(request):
    qs = models.Sheet.objects.all()
    qnames = [(x.id, x.sheetname_set.filter(language__name="english")[0].name) for x in qs]

    print(qnames)
    return render(request,'sheets/upload_loader.html', {"obj_list":qs,"file_list":qnames})

def get_feature(request):
    feature_id = request.GET.get('feature', None)
    lang_name = request.GET.get('language', None)
    depth = int(request.GET.get('depth', 0))

    if not (feature_id and lang_name):
        raise Http404("Insufficient parameters")

    feature = get_object_or_404(models.Feature, id=feature_id)
    lang = get_object_or_404(models.Language, name=lang_name.lower())

    obj = utils.get_feature_python_object(feature, lang, depth)

    return JsonResponse(obj)


def get_feature_name_tree(request):
    sheet_id = request.GET.get('sheet', None)
    lang_name = request.GET.get('language', None)

    if not (sheet_id and lang_name):
        raise Http404("Insufficient parameters")

    sheet = get_object_or_404(models.Sheet, id=sheet_id)
    lang = get_object_or_404(models.Language, name=lang_name.lower())

    obj = utils.get_feature_tree_python_object(sheet, lang)

    return JsonResponse(obj, safe=False)


def get_feature_search_list(request):
    sheet_id = request.GET.get('sheet', None)
    lang_name = request.GET.get('language', None)

    if not (sheet_id and lang_name):
        raise Http404("Insufficient parameters")

    sheet = get_object_or_404(models.Sheet, id=sheet_id)
    lang = get_object_or_404(models.Language, name=lang_name.lower())

    obj = utils.get_sheet_feature_names_list_with_parent(sheet, lang)

    return JsonResponse(obj, safe=False)

import random
def file_reupload_ajax(request):
    response_lists = ["uploading", "wait for few seconds", "thanks while we parse the file"]
    response_text = random.choice(response_lists)
    return JsonResponse(response_text, safe=False)