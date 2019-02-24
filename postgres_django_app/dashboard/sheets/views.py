from django.shortcuts import render

# Create your views here.
import json


def edit(request):
    time_series = {"timestamp1": 1, "timestamp2": 2}

    json_string = json.dumps(time_series)
    return  render(request, "edit.html", {'time_series_json_string': json_string})