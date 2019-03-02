from sheets.objects import *
import pandas as pd
import math

ROW_READ_OFFSET = 3

LANGUAGE1 = 'english'
LANGUAGE1_ROW = 0

LANGUAGE2 = 'hindi'
LANGUAGE2_ROW = 1


def parse_year(value):
    if isinstance(value, int):
        return value
    elif isinstance(value, str):
        split_value = value.split('-')
        try:
            int_value = int(split_value[0])
            return int_value
        except ValueError:
            raise ValueError(f'{value} was split to {split_value[0]}. Unable to parse further into int year')
    else:
        raise TypeError("Got an year value that was not int or string!")


def get_start_year(tdf):
    col0_idx = tdf.columns[0]
    col0 = list(tdf[col0_idx])
    start_year = parse_year(col0[ROW_READ_OFFSET])
    return start_year


def parse_sheet_to_object(sheet_path):
    # tdf = pd.read_excel('S1.1_ref.xlsx')
    tdf = pd.read_excel(sheet_path)
    sheet = create_sheet({"english": 'statement1.1'})

    # print(tdf.columns)
    year_col_idx = tdf.columns[0]
    year_col = list(tdf[year_col_idx])
    # x = tdf['Gross Saving']
    # print(x)
    start_year = get_start_year(tdf)

    current_parent = None
    last_feature = None
    pre_idx_depth = 0
    for idx in tdf.columns[1:]:
        col = list(tdf[idx])

        # get name of column
        # print(col[LANGUAGE1_ROW], col[LANGUAGE2_ROW])
        names = {LANGUAGE1: col[LANGUAGE1_ROW].strip().strip('*'), LANGUAGE2: col[LANGUAGE2_ROW].strip().strip('*')}

        cur_depth = len(idx.split('.'))
        if cur_depth > pre_idx_depth:
            current_parent = last_feature
        if cur_depth < pre_idx_depth:
            current_parent = current_parent.parent

        if col[LANGUAGE1_ROW].strip()[0] == "$":
            feat = sheet.create_entity(names, start_year, current_parent)
        else:
            feat = sheet.create_feature(names, start_year, current_parent)

        last_feature = feat
        pre_idx_depth = cur_depth
        type_pos = [i for i in range(ROW_READ_OFFSET, len(col)) if col[i] and isinstance(col[i], str)]
        #

        cur_type_pos = ROW_READ_OFFSET - 1
        # type_value_dict = dict()
        type_pos.append(len(col))
        # print(type_pos)

        for tp in type_pos:
            feature_values = col[cur_type_pos + 1:tp]
            # print(cur_type_pos, feature_values)
            if all(math.isnan(val) for val in feature_values):
                # All values are nan
                cur_type_pos = tp
                continue

            sheet.set_feature_type_values(feat, col[cur_type_pos], feature_values)

            cur_type_pos = tp

        feat.remove_initial_nans()

    # print(sheet.types)
    # print(sheet.data_obj)
    # po = sheet.data_obj[0]
    #
    # print('\n')
    # print("names = ", po.names, "subfeatures=", po.subfeatures)
    # print(po.subfeatures[0].start_year, po.subfeatures[0].values)
    # print()
    # pe = sheet.data_obj[-1]
    # print("names = ", pe.names, "subfeatures=", pe.subfeatures)
    # print(pe.subfeatures[0].start_year, pe.subfeatures[0].values)

    return sheet


def parse_meta_sheet(sheet_object, meta_file_path):
    if not isinstance(sheet_object, SheetObject):
        raise TypeError("sheet_object must be of type Sheet Object ")

    f = open(meta_file_path, mode="r")
    lines = f.readlines()
    f.close()

    split_idx = [idx for idx in range(len(lines)) if lines[idx][:5] == "-----"]

    # print(split_idx)
    names = lines[:split_idx[0]]
    types = lines[split_idx[0] + 1:split_idx[1]]
    entity = lines[split_idx[1] + 1:split_idx[2]]
    unit = lines[split_idx[2]+1:]

    print(names, types, unit)
    if names[0].lower().strip(':\n') != "name" or types[0].lower().strip(':\n') != "types" or unit[0].lower().strip(':\n') != "unit":
        raise SyntaxError("Inconsistant format. Unable to parse meta file.")

    names = names[1:]
    types = types[1:]
    entity = types[1:]
    unit = unit[1:]

    if len(names) < 1 or len(unit) < 1:
        raise SyntaxError("Inconsistant format. Either name or unit os not supplied.")

    lang_idx = 0
    lang_dict = ["english", "hindi"]
    for name_str in names:
        sheet_object.set_language_name(lang_dict[lang_idx], name_str)
        lang_idx += 1

    for tp in types:
        type_names = tp.split(',')
        possible_tp = sheet_object.find_type_by_english_name(type_names[0])
        if possible_tp:
            if len(type_names) > 1:
                possible_tp.set_language_name('hindi', type_names[1])

    u = unit[0].split(',')[0]
    sheet_object.set_unit(u)

    return entity[0].lower()
