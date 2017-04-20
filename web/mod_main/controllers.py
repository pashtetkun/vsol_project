# -*- coding: utf-8 -*-
from flask import Blueprint, Response, request, send_from_directory
from web.mod_main.models import Country
import json
from web.mod_main import parsers, data_manager
import os


mod_main = Blueprint('main', __name__, url_prefix='')


def to_json(data):
    return json.dumps(data) + "\n"


def resp(code, data):
    return Response(
        status=code,
        mimetype="application/json",
        response=to_json(data)
    )


@mod_main.before_app_first_request
def init_actions():
    data_manager.init_actions()


@mod_main.route('/media/<path:directory>/<path:filename>')
def media_url(directory, filename):
    print("media request")
    print("directory: " + directory)
    print("filename: " + filename)
    folder = os.path.join("c:\media", directory)
    print("folder: " + folder)
    return send_from_directory(folder, filename)


@mod_main.route('/adminApi/countries', methods=['GET'])
def get_countries():
    countries = Country.objects
    return resp(200, {"resultStatus": "SUCCESS", "result": json.loads(countries.to_json())})


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
    cntrs = Country.objects
    return resp(200, {"resultStatus": "SUCCESS", "result": json.loads(cntrs.to_json())})


@mod_main.route('/adminApi/country/<int:id>', methods=['GET'])
def get_country(id):
    hidden = request.args.get('showHidden')
    clubs = data_manager.get_country_clubs(id, True if hidden else False)
    return resp(200, {"resultStatus": "SUCCESS", "result": json.loads(clubs.to_json())})


@mod_main.route('/adminApi/country', methods=['POST'])
def post_country():
    country_id = request.get_json()['id']
    data_manager.init_clubs_for_country(country_id)
    clubs = data_manager.get_country_clubs(country_id, False)
    return resp(200, {"resultStatus": "SUCCESS", "result": json.loads(clubs.to_json())})


@mod_main.route('/adminApi/club/<int:id>', methods=['GET'])
def get_club(id):
    club = data_manager.get_club(id)
    return resp(200, {"resultStatus": "SUCCESS", "result": json.loads(club.to_json())})


if __name__ == "__main__":
    pass

