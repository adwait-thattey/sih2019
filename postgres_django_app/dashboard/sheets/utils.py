import math

from . import models
from .sheet_parser import parse_sheet_to_object


def check_and_create_lang_object(lang_name):
    lang_obj = models.Language.objects.filter(name=lang_name)

    if not lang_obj.exists():
        lang_obj = models.Language.objects.create(name=lang_name)
    else:
        lang_obj = lang_obj[0]

    return lang_obj


def does_type_exist(type):
    type_lang_iter = iter(type.names)
    lang1 = next(type_lang_iter)

    name1 = type.names[lang1]

    dbtn = models.TypeName.objects.filter(name=name1)

    if not dbtn.exists():
        # type does not exist
        return False

    pt = dbtn[0].type

    while True:
        try:
            lang = next(type_lang_iter)
            if not pt.typenames_set.filter(name=type.names[lang]).exist():
                print(lang, type.names.lang)
                return False
        except StopIteration:
            break

    return pt


def parse_types(sheet):
    db_type_obj_dict = dict()
    for tp in sheet.types:

        # Check if similar tp alredy exists

        possible_type = does_type_exist(tp)
        print(possible_type, bool(possible_type))
        if not possible_type:
            type_obj = models.Type.objects.create()
            for lang in tp.names:
                lang_obj = check_and_create_lang_object(lang)

                models.TypeName.objects.create(type=type_obj, language=lang_obj, name=tp.names[lang])

        else:
            type_obj = possible_type

        db_type_obj_dict[tp] = type_obj

    return db_type_obj_dict


def parse_feature_names(feature, db_feature):
    for lang in feature.names:
        lang_obj = check_and_create_lang_object(lang)
        db_feature_name = models.FeatureName.objects.create(feature=db_feature, language=lang_obj,
                                                            name=feature.names[lang])


def parse_feature_values(feature, db_feature, db_type_obj_dict):
    for tp in feature.values:
        db_type = db_type_obj_dict[tp]

        cur_year = feature.start_year

        idx = 0
        for val in feature.values[tp]:
            if math.isnan(val):
                val = 0.0

            models.Cell.objects.create(feature=db_feature,
                                       type=db_type_obj_dict[tp],
                                       start_year=cur_year + idx,
                                       end_year=cur_year + idx + 1,
                                       value=val
                                       )
            idx += 1
        # gracefully handle nans while inserting


def parse_feature(db_sheet, db_type_obj_dict, feature, db_parent_feature):
    if db_parent_feature:
        db_feature = models.Feature.objects.create(parent_feature=db_parent_feature, start_year=feature.start_year)
    else:
        db_feature = models.Feature.objects.create(sheet=db_sheet, start_year=feature.start_year)

    parse_feature_names(feature, db_feature)

    parse_feature_values(feature, db_feature, db_type_obj_dict)

    print(feature.names['english'])
    for child_feat in feature.subfeatures:
        parse_feature(db_sheet, db_type_obj_dict, child_feat, db_feature)


def parse_sheet_to_db(sheet_path, category):
    sheet = parse_sheet_to_object(sheet_path)

    # create sheet
    db_sheet = models.Sheet(category=category, file_loc=sheet_path)
    db_sheet.save()

    # create sheet names
    for lang in sheet.names:
        lang_obj = check_and_create_lang_object(lang)
        name_obj = models.SheetName(sheet=db_sheet, language=lang_obj, name=sheet.names[lang])
        name_obj.save()

    # create data types
    db_type_obj_dict = parse_types(sheet)

    # parse features
    for feat in sheet.data_obj:
        parse_feature(db_sheet, db_type_obj_dict, feat, None)


def get_feature_name(db_feature, db_language):
    try:
        name = db_feature.featurename_set.get(language=db_language).name
    except models.FeatureName.DoesNotExist:
        try:
            name = db_feature.featurename_set.all()[0].name
        except IndexError:
            name = "Unknown Name"

    return name


def get_feature_python_object(db_feature, db_language, depth):
    """

    :param depth: This signifies how much deep you want to go in subfeatures.
    If 0, give only current feature , skip the subfeatures

    """
    name = get_feature_name(db_feature, db_language)

    # print(name)

    cell_set = db_feature.cell_set

    type_ids = set(cell_set.values_list('type', flat=True).distinct())

    types = models.Type.objects.filter(id__in=type_ids)

    type_names = list()
    for tp in types:
        try:
            type_name = tp.typename_set.get(language=db_language).name
        except:
            try:
                type_name = tp.typename_set.all()[0].name
            except:
                type_name = "Unknown Type"

        type_names.append(type_name)

    values_dict = {type_names[ix]: list(db_feature.cell_set.filter(type=types[ix]).values_list('value', flat=True)) for
                   ix in
                   range(len(types))}

    # print(values_dict)

    return_dict = {
        "id":db_feature.id,
        "name": name,
        "start_year": db_feature.start_year,
        "values": values_dict,
        # "subfeatures": [get_feature_python_object(db_subfeat, db_language, depth - 1) for db_subfeat in
        #                               db_feature.feature_set.all()]
    }

    if depth > 0:
        return_dict["subfeatures"] = [get_feature_python_object(db_subfeat, db_language, depth - 1) for db_subfeat in
                                      db_feature.feature_set.all()]

    # print(return_dict)
    return return_dict


def get_feat_object_tree(db_feature, db_language):
    name = get_feature_name(db_feature, db_language)

    feat_dict = {
        "id": db_feature.id,
        "name": name,
        "subfeatures": [get_feat_object_tree(subfeat, db_language) for subfeat in db_feature.feature_set.all()]
    }

    # print(name, db_feature.feature_set.all())
    return feat_dict


def get_feature_tree_python_object(db_sheet, db_language):
    feat_list = list()

    for db_feat in db_sheet.feature_set.all():
        feat_list.append(get_feat_object_tree(db_feat, db_language))

    print(feat_list)
    return feat_list


def get_feature_names_parent(db_feature, db_language):
    l = [{"id": child_feat.id, "name": get_feature_name(child_feat, db_language), "parent": db_feature.id} for
         child_feat in
         db_feature.feature_set.all()]

    for child in db_feature.feature_set.all():
        l.extend(get_feature_names_parent(child, db_language))

    # print(l)
    return l


def get_sheet_feature_names_list_with_parent(db_sheet, db_language):
    l = list()

    for feat in db_sheet.feature_set.all():
        l.append({"id": feat.id, "name": get_feature_name(feat, db_language), "parent": None})
    for feat in db_sheet.feature_set.all():
        l.extend(get_feature_names_parent(feat, db_language))

    print(l)
    return l
