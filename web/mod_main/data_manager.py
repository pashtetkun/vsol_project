# -*- coding: utf-8 -*-
from web.mod_main.models import Country, Club, Settings, Club_status
from web.mod_main import parsers
import imghdr
import os
from mongoengine.queryset.visitor import Q
import datetime


def init_actions():
    if not Settings.objects:
        settings = Settings(
            media_path='c:/media',
            media_url='media',
            media_clubs='clubs',
            media_domain='http://localhost:5000'
        )
        settings.save()


def save_vsol_club_logo(vsol_id):
    settings = Settings.objects[0]
    bytes = parsers.get_club_logo(vsol_id)
    url = ''
    name = ''
    size = 0
    if bytes:
        ext = imghdr.what(None, bytes)
        name = '%d.%s' % (vsol_id, ext)
        url = '%s\%s\%s\%s' % (settings.media_domain, settings.media_url, settings.media_clubs, name)
        full_path = os.path.join(settings.media_path, settings.media_clubs, name)
        size = len(bytes)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'wb') as f:
            f.write(bytes)

    #print(Club.objects(vsol_id=vsol_id))
    return url, size


def init_clubs_for_country(country_id):
    clubs = parsers.get_clubs(country_id)

    country = Country.objects(vsol_id=country_id)[0]
    hidden_clubs = parsers.get_hidden_clubs_for_country(country.name)
    if hidden_clubs:
        clubs.extend(hidden_clubs)

    for club in clubs:
        url, size = save_vsol_club_logo(club['vsol_id'])
        c = Club(
            vsol_id=club['vsol_id'],
            vsol_name=club['name'],
            vsol_stadium=club['stadium'],
            vsol_logo_url=url,
            vsol_logo_size=size,
            vsol_isHidden=club['isHidden'],
            vsol_country_id=country_id,
            last_syncronization=datetime.datetime.now(),
            name=club['name'],
            stadium=club['stadium'],
            logo_url=url,
            logo_size=size,
            status=Club_status.UNDEFINED.value
        )
        c.save()

    return clubs


def get_country_clubs(country_id, showHidden):
    clubs = Club.objects(Q(vsol_country_id=country_id) & Q(vsol_isHidden=showHidden))
    return clubs


def get_club(id):
    club = Club.objects(vsol_id=id)[0]
    return club

if __name__ == "__main__":


    #save_vsol_club_logo(697)
    save_vsol_club_logo(2)
    #save_club_logo(12135)
    #save_club_logo(101)


    #init_clubs_for_country(4)
    #init_clubs_for_country(8)

    #print(len(get_country_clubs(4, False)))
    #print(len(get_country_clubs(4, True)))

    #print(get_club(5772))