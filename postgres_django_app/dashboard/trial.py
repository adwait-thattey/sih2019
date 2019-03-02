from django.conf import settings
import os
from sheets import utils, models

sheet_path = os.path.join(settings.BASE_DIR, 'sheets/etc/normalized_data/1.3_ref (1).xlsx')
utils.parse_sheet_to_db(sheet_path, models.Category.objects.all()[0])
