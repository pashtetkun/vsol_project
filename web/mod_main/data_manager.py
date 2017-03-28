# -*- coding: utf-8 -*-
from web.mod_main.models import Country, Club
from web.mod_main import parsers
import imghdr


def save_club_logo(vsol_id):
    bytes = parsers.get_club_logo(vsol_id)
    path = ''
    size = 0
    if bytes:
        ext = imghdr.what(None, bytes)
        path = '%d.%s' % (vsol_id, ext)
        size = len(bytes)
        with open(path, 'wb') as f:
            f.write(bytes)

    print(Club.objects(vsol_id=vsol_id))

if __name__ == "__main__":
    save_club_logo(697)
    save_club_logo(2)
    save_club_logo(12135)
    save_club_logo(101)

