import math

from sheets.objects import Feature, Entity
from . import models
from .sheet_parser import parse_sheet_to_object, parse_meta_sheet


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
        # print(possible_type, bool(possible_type))
        if not possible_type:
            type_obj = models.Type.objects.create()
            for lang in tp.names:
                lang_obj = check_and_create_lang_object(lang)

                if tp.names[lang] == "nan":
                    tp.names[lang] = "none"
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


def parse_entity_names(entity, db_entity):
    for lang in entity.names:
        lang_obj = check_and_create_lang_object(lang)
        db_entity_name = models.EntityName.objects.create(entity=db_entity, language=lang_obj, name=entity.names[lang])


def find_feature_by_english_name(feature_name):
    feat_name = models.FeatureName.objects.filter(name=feature_name)
    print("found - ", feat_name)
    if feat_name.exists():
        return feat_name[0].feature
    else:
        return None


def find_entity_by_english_name(entity_name):
    ent_name = models.EntityName.objects.filter(name=entity_name)
    if ent_name.exists():
        return ent_name[0].entity
    else:
        return None




def parse_feature(db_sheet, db_type_obj_dict, feat_entity, db_parent_feature):
    # print("parent feature:", db_parent_feature)

    if isinstance(feat_entity.parent, Entity):
        if db_parent_feature:
            db_parent_feature = db_parent_feature.parent_feature

    print(feat_entity.names['english'])
    possible_feat = find_feature_by_english_name(feat_entity.names['english'].lower())
    print(possible_feat)
    if possible_feat:
        if possible_feat.parent_feature != db_parent_feature:
            print("error - ", possible_feat,"-" ,  possible_feat.parent_feature, "-", db_parent_feature)
            raise AssertionError("Feature: Existing parent not same as incoming parent!")

        db_feature = possible_feat
    else:
        if db_parent_feature:
            db_feature = models.Feature.objects.create(parent_feature=db_parent_feature)
        else:
            db_feature = models.Feature.objects.create(sheet=db_sheet)

        parse_feature_names(feat_entity, db_feature)

    print("feature", feat_entity.names['english'])
    # for child_feat in feat_entity.subfeatures:
    #     parse_feature(db_sheet, db_type_obj_dict, child_feat, db_feature)

    return db_feature

def parse_entity(db_sheet, db_type_obj_dict, feat_entity, db_parent_feature, db_parent_entity):

    db_entity = models.Entity()
    if db_parent_entity:
        db_entity.parent_entity = db_parent_entity
    if db_parent_feature:
        db_entity.parent_feature = db_parent_feature

    if not (db_parent_feature or db_parent_entity):
        db_entity.sheet = db_sheet

    db_entity.save()

    print("entity", feat_entity.names['english'])
    parse_entity_names(feat_entity, db_entity)

    return db_entity

def parse_feature_entity_values(feat_entity, db_feat_entity, db_parent_entity, db_parent_feature, db_type_obj_dict):
    for tp in feat_entity.values:
        db_type = db_type_obj_dict[tp]

        cur_year = feat_entity.start_year

        formatted_values = [0 if math.isnan(val) else val for val in feat_entity.values[tp]]

        print(feat_entity, "-", db_parent_entity, "-", db_feat_entity)
        if isinstance(feat_entity, Feature):
            models.FeatureRow.objects.create(feature=db_feat_entity,
                                             entity=db_parent_entity,
                                             type=db_type_obj_dict[tp],
                                             values=formatted_values,
                                             start_year=cur_year
                                             )
        else:
            models.FeatureRow.objects.create(feature=db_parent_feature,
                                             entity=db_feat_entity,
                                             type=db_type_obj_dict[tp],
                                             values=formatted_values,
                                             start_year=cur_year
                                             )




def parse_feature_or_entity(db_sheet, db_type_object_entity, feat_entity, last_feature, last_entity):
    # print(feat_entity, feat_entity.subfeatures)
    feat_flag = False
    if isinstance(feat_entity, Feature):
        new_feat_ent = parse_feature(db_sheet, db_type_object_entity, feat_entity, last_feature)
        feat_flag = True
    elif isinstance(feat_entity, Entity):
        # print("xxxxxxxxxxparse entity")
        new_feat_ent = parse_entity(db_sheet, db_type_object_entity, feat_entity, last_feature, last_entity)
    else:
        raise TypeError("Expected either feature or entity")

    print("flag", feat_flag)
    # print(feat_entity.subfeatures)

    parse_feature_entity_values(feat_entity, new_feat_ent,last_entity, last_feature,db_type_object_entity)
    for sub_feat_ent in feat_entity.subfeatures:
        if feat_flag:

            parse_feature_or_entity(db_sheet, db_type_object_entity, sub_feat_ent, new_feat_ent, last_entity)
        else:

            parse_feature_or_entity(db_sheet, db_type_object_entity, sub_feat_ent, last_feature, new_feat_ent)


def parse_sheet_to_db(sheet_path, meta_file_path, category):
    sheet = parse_sheet_to_object(sheet_path)
    db_sheet = models.Sheet(category=category, file_loc=sheet_path)
    db_sheet.save()
    for lang in sheet.names:
        lang_obj = check_and_create_lang_object(lang)
        name_obj = models.SheetName(sheet=db_sheet, language=lang_obj, name=sheet.names[lang])
        name_obj.save()

    db_type_obj_dict = parse_types(sheet)

    entity_names = parse_meta_sheet(sheet, meta_file_path)
    if entity_names.split(',')[0] == "none":
        entity = None
    else:
        entity_name = models.EntityName.objects.filter(name=entity_names.split(',')[0])
        if entity_name.exists():
            entity = entity_name[0].entity
        else:
            entity = models.Entity.objects.create(sheet=db_sheet)
            nms = entity_names.split(',')
            lang_objs = ['english', 'hindi']
            for ix in range(len(nms)):
                models.EntityName.objects.create(entity=entity, language=check_and_create_lang_object(lang_objs[ix]),
                                                 name=nms[ix])

    # parse features and entities
    # print(sheet.data_obj)
    for feat_entity in sheet.data_obj:
        parse_feature_or_entity(db_sheet, db_type_obj_dict, feat_entity, last_feature=None, last_entity=entity)

    # parse_meta_sheet(sheet, meta_file_path)

    # raise StopIteration()
    # create sheet
    # db_sheet = models.Sheet(category=category, file_loc=sheet_path)
    #
    # db_sheet.save()
    # # create sheet names
    #
    #
    # # create data types
    #
    # # parse features


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

    row_set = db_feature.featurerow_set

    # type_ids = set(cell_set.values_list('type', flat=True).distinct())
    type_ids = set(row_set.values_list('type', flat=True).distinct())

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

    # values_dict = {type_names[ix]: list(db_feature.cell_set.filter(type=types[ix]).values_list('value', flat=True)) for
    #                ix in
    #                range(len(types))}

    # print(types)

    values_dict = {type_names[ix]: row_set.get(type=types[ix]).values for ix in range(len(types))}

    # row_set = db_feature.feature_row_set

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

    # print(feat_list)
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

    # print(l)
    return l
