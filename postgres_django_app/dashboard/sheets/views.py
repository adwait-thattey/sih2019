from django.shortcuts import render


# Create your views here.


def parse_object_in_db(obj):
    """

    sample object structure is below

    type1 = current
    type2 = constant
    """
    sample_obj = {
        "name": {
            "english": "<English Name>",
            "hindi": "<Hindi Name>"
        },
        "data": {
            "type1": {
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
            },

            "type2": {
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
            }
        },
    }

    pass
