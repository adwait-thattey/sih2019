import math


class Type:
    def __init__(self):
        self.names = {}

    def set_language_name(self, language, name):
        self.names[language.lower()] = name

    def __repr__(self):
        if "english" in self.names:
            return f'<Type:{self.names["english"]}>'

        else:
            return f'<Type:[no english name][{id(self)}]>'


class Feature:
    def __init__(self):
        self.names = {}
        self.start_year = 2011
        self.values = dict()
        self.subfeatures = list()
        self.parent = None

    def __repr__(self):
        if 'english' in self.names:
            return f'<Feature:{self.names["english"]}>'
        else:
            return f'<Feature:[no english name][{id(self)}]>'

    def set_language_name(self, language, name):
        self.names[language.lower()] = name

    def set_start_year(self, start_year):
        if not isinstance(start_year, int):
            raise TypeError("start year must be of type int")
        self.start_year = start_year

    def set_values(self, ty, values):

        if not isinstance(values, list):
            raise TypeError("Expected values to be of type list")

        self.values[ty] = values

    def _set_parent(self, feature):
        if not isinstance(feature, Feature):
            raise TypeError("The given object is not an instance of Feature object")

        self.parent = feature

    def add_subfeature(self, feature):
        if not isinstance(feature, Feature):
            raise TypeError("The given object is not an instance of Feature object")

        if not isinstance(self.subfeatures, list):
            self.subfeatures = list()

        feature._set_parent(self)
        self.subfeatures.append(feature)

        return self.subfeatures[-1]

    def remove_initial_nans(self):
        if self.values:
            no_nan_list = list()

            for tp in self.values:
                pos = 0
                while (pos < len(self.values[tp])):
                    if not math.isnan(self.values[tp][pos]):
                        no_nan_list.append(pos)
                        break
                    else:
                        pos += 1

            min_nans = min(no_nan_list)
            # print(min_nans)
            if min_nans > 0:
                for tp in self.values:
                    self.values[tp] = self.values[tp][min_nans:]

                # print(self.start_year)
                self.start_year += min_nans
                # print(self.start_year)
            # remove min_nans from each tuple


class SheetObject:
    def __init__(self):
        self.names = {}
        self.types = []
        self.data_obj = []
        self.xyz = 10

    def __repr__(self):
        if "english" in self.names:
            return f'<Sheet:{self.names["english"]}>'

        else:
            return f'<Sheet:[no english name][{id(self)}]>'

    def set_language_name(self, language, name):
        self.names[language.lower()] = name

    def attach_type(self, type):
        if not isinstance(type, Type):
            raise TypeError("type must be an instance of Type")

        self.types.append(type)

    def create_type(self, names):
        T = Type()

        for key in names:
            T.set_language_name(key, names[key])

        self.attach_type(T)
        return T

    def find_type_by_english_name(self, name):
        for t in self.types:
            if t.names['english'] == name:
                return t

        else:
            return None

    def find_parent(self, type):
        pass

    def create_feature(self, feature_names, start_year=None, parent_feature=None):
        # if not (parent_feature or type):
        #     raise TypeError("You must supply either the parent feature or a type name")
        #
        # if parent_feature and type:
        #     raise TypeError("Please supply either type or parent but not both. It may lead to conflicts")

        feature = Feature()
        for key in feature_names:
            feature.set_language_name(key, feature_names[key])

        feature.set_start_year(start_year)
        if parent_feature:
            if not isinstance(parent_feature, Feature):
                raise TypeError("The given parent object is not an instance of feature")

            parent_feature.add_subfeature(feature)

        else:
            self.data_obj.append(feature)

        return feature

    def set_feature_type_values(self, feature, type_name, values):
        if not isinstance(feature, Feature):
            raise TypeError("The given object is not an instance of feature")

        ty = self.find_type_by_english_name(type_name)
        if not ty:
            ty = self.create_type({"english": type_name})
        feature.set_values(ty, values)


def create_sheet(names):
    """

    :param names: A dict containing language vs name
    ex: {"English":"Sheet1"}
    :return:
    """
    if not isinstance(names, dict):
        raise TypeError("names is expected to be a dict type")

    sheet = SheetObject()
    for key in names:
        sheet.set_language_name(key, names[key])

    return sheet


"""
sample_obj = {
        "name": {
            "english": "<English Name>",
            "hindi": "<Hindi Name>"
        },
        "data": [
                "feature1": {
                    "start_year":2011
                    "values": {
                    "type1": [10, 20, 30, 40],
                    "type2": [10,20,30,40]
                    }
                    "subfeatures": [
                        "subfeature1": {
                            "values": [10, 20, 30, 40],
                            "subfeature1": {
                                "values": [10, 20, 30, 40]
                            }
                        },
                        "subfeature2": {
                            "values": [10, 20, 30, 40]
                        }
                    ]
                }
            ],

            
"""
