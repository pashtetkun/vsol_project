# -*- coding: utf-8 -*-
from web.mod_main.models import Country, Club, Settings
from web.mod_main import parsers
import imghdr
import os


def init_actions():
    if not Settings.objects:
        settings = Settings(media_path='c:/media', media_url='static')
        settings.save()


def save_club_logo(vsol_id):
    settings = Settings.objects[0]
    bytes = parsers.get_club_logo(vsol_id)
    name = ''
    size = 0
    if bytes:
        ext = imghdr.what(None, bytes)
        name = '%d.%s' % (vsol_id, ext)
        full_path = os.path.join(settings.media_path, 'clubs', name)
        size = len(bytes)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'wb') as f:
            f.write(bytes)

    #print(Club.objects(vsol_id=vsol_id))
    return name, size


def init_clubs_for_country(country_id):
    clubs = parsers.get_clubs(country_id)

    country = Country.objects(vsol_id=country_id)[0]
    hidden_clubs = parsers.get_hidden_clubs_for_country(country.name)
    if hidden_clubs:
        clubs.extend(hidden_clubs)

    for club in clubs:
        image, size = save_club_logo(club['vsol_id'])
        c = Club(
            name=club['name'],
            vsol_id=club['vsol_id'],
            stadium=club['stadium'],
            isHidden=club['isHidden'],
            country_id=country_id,
            logo_url=image,
            logo_size=size
        )
        c.save()

    return clubs


def get_country_clubs(country_id, showHidden):
    clubs = []
    for club in Club.objects(country_id=country_id):
        if showHidden and not club['isHidden']:
            continue
        if not showHidden and club['isHidden']:
            continue
        cl = {}
        cl['vsol_id'] = club.vsol_id
        cl['name'] = club.name
        clubs.append(cl)

    return clubs


if __name__ == "__main__":

    save_club_logo(697)
    save_club_logo(2)
    save_club_logo(12135)
    save_club_logo(101)

    #init_clubs_for_country(4)
    #init_clubs_for_country(8)

    #print(len(get_country_clubs(4, False)))
    #print(len(get_country_clubs(4, True)))

