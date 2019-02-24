class Feature:
    def __init__(self, name, values=None):
        self.name = name
        self.values = values
        self.subfeatures = None

    def add_subfeature(self, feature):
        if not isinstance(feature, Feature):
            raise TypeError("The given object is not an instance of Feature object")

        if not isinstance(self.subfeatures, list):
            self.subfeatures = list()

        self.subfeatures.append(feature)

        return self.subfeatures[-1]


class SheetObject:
    def ___init__(self):
        self.names = {}
        self.types = []
        self.data_obj = {}
        pass

    def set_language_name(self, language, name):
        self.names[language] = name

    def create_type(self, type_name):
        self.types.append(type_name)
        self.data_obj[type_name] = list()

    def create_feature(self, feature_name, values=None, parent_feature=None, type_name=None):
        if not (parent_feature or type_name):
            raise TypeError("You must supply either the parent feature or a type name")

        feature = Feature(feature_name, values)

        if type_name:
            if type_name not in self.data_obj:
                self.create_type(type_name)

            self.data_obj[type_name].append(feature)

        else:
            if not isinstance(parent_feature, Feature):
                raise TypeError("The given parent object is not an instance of feature")

            parent_feature.add_subfeature(feature)

        return feature



"""
sample_obj = {
        "name": {
            "english": "<English Name>",
            "hindi": "<Hindi Name>"
        },
        "data": {
            "type1": 
                "feature1": {
                    "values": [10, 20, 30, 40],
                    "subfeatures": {
                        "subfeature1": {
                            "values": [10, 20, 30, 40],
                            "subfeature1": {
                                "values": [10, 20, 30, 40]
                            }
                        },
                        "subfeature2": {
                            "values": [10, 20, 30, 40]
                        }
                    }
                }
            ],

            "type2": [
                "feature1": {
                    "values": [10, 20, 30, 40],
                    "subfeatures": {
                        "subfeature1": {
                            "values": [10, 20, 30, 40],
                            "subfeature1": {
                                "values": [10, 20, 30, 40]
                            }
                        },
                        "subfeature2": {
                            "values": [10, 20, 30, 40]
                        }
                    }
                }
            ]
        },
    }
"""
