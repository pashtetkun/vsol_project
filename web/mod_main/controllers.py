# -*- coding: utf-8 -*-
from flask import Blueprint, render_template, Response, request
from web.mod_main.models import HiddenCountry, Country, Club

import json
from web.mod_main import parsers

mod_main = Blueprint('main', __name__, url_prefix='')

def to_json(data):
    return json.dumps(data) + "\n"

def resp(code, data):
    return Response(
        status=code,
        mimetype="application/json",
        response=to_json(data)
    )

"""
@mod_main.route('/adminApi/hiddenCountries', methods=['POST'])
def post_hiddenCountries():
    dict_clubs = parsers.get_hidden_clubs()
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
"""

"""
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
"""

@mod_main.route('/adminApi/countries', methods=['GET'])
def get_countries():
    countries = []
    for country in Country.objects:
        cntr = {
            'name': country.name,
            'sprite_style': country.sprite_style,
            'vsol_id': country.vsol_id
        }
        countries.append(cntr)
    return resp(200, {"resultStatus": "SUCCESS", "result": countries})

@mod_main.route('/adminApi/countries', methods=['POST'])
def post_countries():
    countries = parsers.get_countries()
    Country.objects.delete()
    for country in countries:
        cntr = Country(
            name=country['name'],
            sprite_style=country['style'],
            vsol_id=country['vsol_id']
        )
        cntr.save()
    return resp(200, {"resultStatus": "SUCCESS", "result": countries})

"""
@mod_main.route('/adminApi/initializeData', methods=['POST'])
def initialize_data():
    Country.objects.delete()
    countries = parsers.get_countries()
    for country in countries:
        cntr = Country(
            name=country['name'],
            sprite_style=country['style'],
            vsol_id=country['vsol_id']
        )
        cntr.save()

    Club.objects.delete()
    for country in countries:
        clubs = parsers.get_clubs(country['vsol_id'])
        for club in clubs:
            cl = Club(
                name=club['name'],
                vsol_id=club['vsol_id'],
                country_id=country['vsol_id'],
                isHidden=club['isHidden']
            )
            cl.save()


    return resp(200, {"resultStatus": "SUCCESS"})
"""

@mod_main.route('/adminApi/country/<int:id>', methods=['GET'])
def get_country(id):
    clubs = []
    for club in Club.objects(country_id=id):
        cl = {}
        cl['vsol_id'] = club.vsol_id
        cl['name'] = club.name
        clubs.append(cl)
    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})

@mod_main.route('/adminApi/country', methods=['POST'])
def post_country():
    country_id = request.get_json()['id']
    clubs = parsers.get_clubs(country_id)

    for club in clubs:
        c = Club(
            name=club['name'],
            vsol_id=club['vsol_id'],
            isHidden=False,
            country_id=country_id
        )
        c.save()
    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})

if __name__ == "__main__":
    pass
    
