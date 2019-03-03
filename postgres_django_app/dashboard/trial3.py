from sheets.models import *
from sheets.utils import *
from sheets.sheet_parser import *

c = Category.objects.all()[0]

s = "/media/coderdude/Adwait/Projects/sih/sih2019/postgres_django_app/dashboard/sheets/etc/1.6B_final.xlsx"

meta = "/media/coderdude/Adwait/Projects/sih/sih2019/postgres_django_app/dashboard/sheets/etc/S1.6_B_meta.txt"

sheet = parse_sheet_to_db(s, meta, c)
