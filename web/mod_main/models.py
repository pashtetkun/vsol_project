# -*- coding: utf-8 -*-

from web import db
import mongoengine_goodjson as gj
from enum import Enum


class Settings(db.Document):
    media_path = db.StringField(max_length=255, required=True)
    media_url = db.StringField(max_length=255, required=True)


class Country(gj.Document):
    vsol_id = db.IntField(required=True)
    name = db.StringField(max_length=255, required=True)
    colors_position = db.StringField(max_length=255, required=True)


class Club_status(Enum):
    UNDEFINED = 'undefined'
    VALIDATED = 'validated'
    IN_PROCESSING = 'in_processing'
    CHANGED_NAME = 'changed_name'
    CHANGED_LOGO = 'changed_logo'
    CHANGED_STADIUM = 'changed_stadium'


class Club(gj.Document):
    vsol_id = db.IntField(required=True)
    name = db.StringField(max_length=255, required=True)
    name_eng = db.StringField(max_length=255, required=True, default='')
    stadium = db.StringField(max_length=255, required=True, default='')
    stadium_eng = db.StringField(max_length=255, required=True, default='')
    logo_url = db.StringField(max_length=255, required=True, default='')
    logo_size = db.IntField(required=True, default=0)
    isHidden = db.BooleanField(required=True)
    country_id = db.IntField(required=True)
    status = db.StringField(max_length=255, required=True)


if __name__ == "__main__":
    countries = list(Country.objects)
    print(countries)
    pass
    
