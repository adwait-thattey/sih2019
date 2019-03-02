from sheets.models import *
from sheets.utils import *

S = Sheet.objects.all()[1]
F = Feature.objects.get(pk=46)
L = Language.objects.get(pk=1)

# get_feature_tree_python_object(S,L)
# get_sheet_feature_names_list_with_parent(S, L)
D = get_feature_python_object(F, L, 100)

print(D)