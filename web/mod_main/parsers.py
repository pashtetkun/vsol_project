# -*- coding: utf-8 -*-
import lxml.html as html
import requests
import re


HIDDEN_TEAMS_URL = 'http://virtualsoccer.ru/teams_hidden.php'
COUNTRIES_URL = 'http://virtualsoccer.ru/teams.php'
COUNTRY_URL = 'http://virtualsoccer.ru/teams_cntr.php'
CLUB_URL = 'http://virtualsoccer.ru/roster.php'
LOGO_URL = 'http://virtualsoccer.ru/embl_teams.php' #?id=12135


def get_club_logo(vsol_id):
    url = "%s?id=%d" % (LOGO_URL, vsol_id)
    r = requests.get(url)
    return r.content


def get_countries():
    countries = []
    page = html.parse(COUNTRIES_URL)
    table = page.getroot().find_class('tbl')[0]
    rows = table.getchildren()
    for count, row in enumerate(rows):
        if ((count < 2) or (count == len(rows) - 1)):
            continue

        name = ''
        colors_position = ''
        vsol_id = 0
        for i, col in enumerate(row):
            if (i > 1):
                continue

            if (i == 0):
                name = col.attrib['title']
                colors_position = col.find("div").attrib['style'].split(':')[1].replace('px', '').lstrip()

            if (i == 1):
                href = col.getchildren()[0].find('a').attrib['href']
                vsol_id = int(href.split('=')[1])

        countries.append({
            'name': name,
            'colors_position': colors_position,
            'vsol_id': vsol_id
        })
            
    return countries


def get_clubs(country_id):
    clubs = []
    page = html.parse("%s?num=%d" % (COUNTRY_URL, country_id))
    table = None
    tables = page.getroot().find_class('tbl')

    for tbl in tables:
        if (len(tbl.getchildren()[0][0][0].getchildren()) == 0):
            continue
        if (tbl.getchildren()[0][0][0][0].text_content() == 'Название команды'):
            table = tbl
            break;

    ids = []
    rows = table.getchildren()
    for count, row in enumerate(rows):
        if ((count == 0) or (count == len(rows) - 1)):
            continue

        vsol_id = 0
        for i, col in enumerate(row):
            if (i == 0):
                a = col.find_class('mnu')[0]
                href = a.attrib['href']
                vsol_id = int(href.split('=')[1])
                break

        ids.append(vsol_id)

    for id in ids:
        club = get_club(id)
        club['isHidden'] = False
        clubs.append(club)

    return clubs


def get_hidden_clubs_for_country(country_name):
    clubs = []
    all_hidden_clubs = get_hidden_clubs()
    if country_name in all_hidden_clubs:
        ids = all_hidden_clubs[country_name]
        for id in ids:
            club = get_club(id)
            club['isHidden'] = True
            clubs.append(club)

    return clubs


def get_club(vsol_id):
    page = html.parse("%s?num=%d" % (CLUB_URL, vsol_id))
    table = page.getroot().xpath("//table[@class='wst nil']//table[@class='wst nil']")[0]
    div_name = table.xpath("//div[@class='tmhd']")[0]
    if (len(div_name.getchildren()) == 0):
        name = div_name.text_content()
    else:
        if (div_name.xpath("//span[@id='team_name']")):
            name = div_name.xpath("//span[@id='team_name']")[0].text_content()
        else:
            name = div_name.text_content()

    parent = div_name.getparent()
    stadiumText = parent.getchildren()[-3].text_content()
    print(vsol_id, stadiumText)
    pattern = re.compile('"[^\"]+"')
    stadium = re.findall(pattern, stadiumText)[0].strip('"')

    '''has_logo = False
    if (table.xpath("//a[@class='mnu']")):
        a = table.xpath("//a[@class='mnu']")[0]
        print(len(a))
        img = a.find("img")

    if (has_logo):
        print("%s?id=%d" % (LOGO_URL, vsol_id))'''

    club = {
        'name': name,
        'stadium': stadium,
        'vsol_id': vsol_id
    }
    return club


def get_hidden_clubs():
    clubs = {}
    page = html.parse("%s" % (HIDDEN_TEAMS_URL, ))
    select = page.getroot().find_class('sel')[0]
    numbers = len(select.getchildren())
    countCl = 0
    ids = []
    for num in range(1, numbers+1):
        page = html.parse("%s?page=%d" % (HIDDEN_TEAMS_URL, num))
        table = page.getroot().find_class('tbl')[0]
        rows = table.getchildren()
        for count, row in enumerate(rows):
            if ((count == 0) or (count == len(rows) - 1)):
                continue
            name = ""
            country = ""
            vsol_id = 0
            for i, col in enumerate(row):
                if (i > 1):
                    continue
                if (i == 0):
                    a = col.find_class('mnu')[0]
                    #name = a.text_content()
                    href = a.attrib['href']
                    vsol_id = int(href.split('=')[1])
                if (i == 1):
                    country = col.attrib['title']

            #club = {'name':name, 'vsol_id':vsol_id, 'isHidden': True}
            countCl+=1
            if (country in clubs):
                clubs.get(country).append(vsol_id)
            else:
                clubs[country] = [vsol_id]

    return clubs


if __name__ == "__main__":
    '''clubs = get_hidden_clubs()
    for k, v in clubs.items():
        print(k)

    print(clubs["Россия"])'''

    #get_hidden_clubs()

    #print(get_countries())

    get_clubs(4)

    #get_club(12135)
    #get_club(9768)
    #get_club(697)
    #get_club(19261)

    """
    get_club_logo(697)
    get_club_logo(2)
    get_club_logo(12135)
    get_club_logo(101)
    """
    
