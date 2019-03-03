from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404
from sheets import objects
from . import utils
from . import models


# Create your views here.

def get_economic_activities():
    cat_name = models.CategoryName.objects.filter(name="Economic Activities")
    cat = cat_name[0].category

    feats = models.Feature.objects.filter(sheet__category=cat)

    ret_dict = []

    for feat in feats:
        fdict = {"id": feat.id,
                 "name": feat.featurename_set.filter(language__name="english")[0].name,
                 }

        for entity in feat.entity_set.all():
            efdict = {
                'start_year': 2011
            }
            for fr in entity.featurerow_set.filter(feature=feat):
                efdict[fr.type.typename_set.filter(language__name="english")[0].name] = fr.values

            fdict[entity.entityname_set.filter(language__name="english")[0].name] = efdict

        ret_dict.append(fdict)

    print(ret_dict)


def get_agriculture_data(request):
    fname = models.FeatureName.objects.filter(name__contains="agriculture")[0]

    feat = fname.feature

    fdict = {"id": feat.id,
             "name": fname.name,
             }

    for entity in feat.entity_set.all():
        efdict = {
            'start_year': 2011
        }
        for fr in entity.featurerow_set.filter(feature=feat):
            efdict[fr.type.typename_set.filter(language__name="english")[0].name] = fr.values

        fdict[entity.entityname_set.filter(language__name="english")[0].name] = efdict

    fdict['subfeatures'] = [subf.featurename_set.filter(language__name="english")[0].name for subf in
                            feat.feature_set.all()]

    return JsonResponse(fdict)


def get_agriculture_data_view(request):

    return render(request, 'sheets/activity.html')



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


def get_complete_tree_by_category(request):
    category_name = request.GET.get('category', None)
    lang_name = request.GET.get('language', None)


def get_feature_search_list(request):
    sheet_id = request.GET.get('sheet', None)
    lang_name = request.GET.get('language', None)

    if not (sheet_id and lang_name):
        raise Http404("Insufficient parameters")

    sheet = get_object_or_404(models.Sheet, id=sheet_id)
    lang = get_object_or_404(models.Language, name=lang_name.lower())

    obj = utils.get_sheet_feature_names_list_with_parent(sheet, lang)

    return JsonResponse(obj, safe=False)
