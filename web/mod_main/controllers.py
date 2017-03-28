# -*- coding: utf-8 -*-
from flask import Blueprint, Response, request
from web.mod_main.models import Country, Club
import json
from web.mod_main import parsers, data_manager


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
    hidden = request.args.get('hidden')
    clubs = data_manager.get_country_clubs(id, True if hidden == "1" else False)
    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})


@mod_main.route('/adminApi/country', methods=['POST'])
def post_country():
    country_id = request.get_json()['id']
    clubs = data_manager.init_clubs_for_country(country_id)

    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})


if __name__ == "__main__":
    pass

