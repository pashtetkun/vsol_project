# -*- coding: utf-8 -*-
from flask import Blueprint, Response, request
from web.mod_main.models import Country, Club
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


@mod_main.route('/adminApi/countries', methods=['GET'])
def get_countries():
    countries = []
    for country in Country.objects:
        cntr = {
            'name': country.name,
            'colors_position': country.colors_position,
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
            colors_position=country['colors_position'],
            vsol_id=country['vsol_id']
        )
        cntr.save()
    return resp(200, {"resultStatus": "SUCCESS", "result": countries})


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

