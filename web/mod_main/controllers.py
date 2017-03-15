# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, Response
from web.mod_main.models import HiddenCountry

import json
from web.mod_main import hidden_teams

mod_main = Blueprint('main', __name__, url_prefix='')

def to_json(data):
    return json.dumps(data) + "\n"

def resp(code, data):
    return Response(
        status=code,
        mimetype="application/json",
        response=to_json(data)
    )

@mod_main.route('/adminApi/hiddenCountries', methods=['POST'])
def post_hiddenCountries():
    dict_clubs = hidden_teams.get_hidden_clubs()
    HiddenCountry.objects.delete()
    clubs = []
    for k,v in dict_clubs.items():
        club = {}
        club['country'] = k
        club['clubs'] = v
        clubs.append(club)
        hiddenCountry = HiddenCountry(
            name=k,
            count_clubs=len(v),
            clubs = v
        )
        hiddenCountry.save()

    return resp(200, {"resultStatus": "SUCCESS"})

    
@mod_main.route('/adminApi/hiddenCountries', methods=['GET'])
def get_hiddenCountries():
    hiddenCountries = HiddenCountry.objects
    clubs = []
    for hiddenCountry in hiddenCountries:
        club = {}
        club['country'] = hiddenCountry.name
        club['clubs'] = hiddenCountry.clubs
        clubs.append(club)

    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})



if __name__ == "__main__":
    pass
    
