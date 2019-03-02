from sheets.models import *
from sheets.utils import *
from sheets.sheet_parser import *


c = Category.objects.all()[0]

s = "/media/riya/Data1/Academics/SIH/Code/sih2019/postgres_django_app/dashboard/sheets/etc/S1.1_ref.xlsx"

sheet = parse_sheet_to_db(s,c)
