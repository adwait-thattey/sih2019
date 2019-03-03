from sheets import models
from sheets.objects import *
import pandas as pd
import math
from sheets.models import FEATURE_LIST

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
    tdf = pd.read_excel(sheet_path)
    sheet = create_sheet({"english": 'statement1.1'})
