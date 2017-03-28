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
    name = ''
    size = 0
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

                #countries.append(name)
                #print(name, style)
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
    #page = html.parse("%s?num=%d" % (COUNTRY_URL, 214))
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
        #name = ""
        vsol_id = 0
        for i, col in enumerate(row):
            if (i == 0):
                a = col.find_class('mnu')[0]
                #name = a.text_content()
                href = a.attrib['href']
                vsol_id = int(href.split('=')[1])
                break

        """clubs.append({
            'name': name,
            'vsol_id': vsol_id,
            'country_id': country_id,
            'isHidden': False
        })"""
        ids.append(vsol_id)

        #print (name, vsol_id)

    for id in ids:
        club = get_club(id)
        clubs.append(club)

    return clubs

def get_hidden_clubs_for_country(country_id):
    all_hidden_clubs = get_hidden_clubs()


def get_club(vsol_id):
    page = html.parse("%s?num=%d" % (CLUB_URL, vsol_id))
    name = ''
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
    pattern = re.compile('"[\w\s]+"')
    stadium = re.findall(pattern, stadiumText)[0].strip('"')

    '''has_logo = False
    if (table.xpath("//a[@class='mnu']")):
        a = table.xpath("//a[@class='mnu']")[0]
        print(len(a))
        img = a.find("img")

    if (has_logo):
        print("%s?id=%d" % (LOGO_URL, vsol_id))'''

    print(name)
    print(stadium)
    club = {
        'name': name,
        'stadium': stadium,
        'vsol_id': vsol_id
    }
    return club


def get_hidden_clubs():
    #numbers = 22
    clubs = {}
    page = html.parse("%s" % (HIDDEN_TEAMS_URL, ))
    select = page.getroot().find_class('sel')[0]
    numbers = len(select.getchildren())
    print(numbers)
    countCl = 0
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
                    name = a.text_content()
                    href = a.attrib['href']
                    vsol_id = int(href.split('=')[1])
                if (i == 1):
                    country = col.attrib['title']

            club = {'name':name, 'vsol_id':vsol_id}
            countCl+=1
            if (country in clubs):
                clubs.get(country).append(club)
            else:
                clubs[country] = [club]

    #od = collections.OrderedDict(sorted(clubs.items()))
    #for k, v in od.items():
        #print(k)

    #print(clubs["Россия"])

    #return od
    #print(len(clubs))
    #print(countCl)
    return clubs


if __name__ == "__main__":
    '''clubs = get_hidden_clubs()
    for k, v in clubs.items():
        print(k)

    print(clubs["Россия"])'''

    #get_hidden_clubs()

    #print(get_countries())

    #print(get_clubs(1))

    #get_club(12135)
    #get_club(9768)
    #get_club(697)
    #get_club(19261)


    get_club_logo(697)
    get_club_logo(2)
    get_club_logo(12135)
    get_club_logo(101)

    
