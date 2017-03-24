import collections
import lxml.html as html
import requests
import imghdr


HIDDEN_TEAMS_URL = 'http://virtualsoccer.ru/teams_hidden.php'
COUNTRIES_URL = 'http://virtualsoccer.ru/teams.php'
COUNTRY_URL = 'http://virtualsoccer.ru/teams_cntr.php'
CLUB_URL = 'http://virtualsoccer.ru/roster.php'
LOGO_URL = 'http://virtualsoccer.ru/embl_teams.php' #?id=12135


def get_club_logo(vsol_id):
    url = "%s?id=%d" % (LOGO_URL, vsol_id)
    r = requests.get(url)
    if (r.status_code == 200) and (r.content):
        print(imghdr.what(None, r.content))
        with open('%d.png' % vsol_id, 'wb') as f:
            f.write(r.content)


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
    #countries = get_countries()
    clubs = []
    #for country in countries:
    page = html.parse("%s?num=%d" % (COUNTRY_URL, country_id))
    #page = html.parse("%s?num=%d" % (COUNTRY_URL, 214))
    table = None
    tables = page.getroot().find_class('tbl')
    if (len(tables) == 1):
        table = tables[0]
    else:
        for tbl in tables:
            if (len(tbl.getchildren()[0][0][0].getchildren()) == 0):
                continue
            if (tbl.getchildren()[0][0][0][0].text_content() == 'Название команды'):
                table = tbl
                break;

    rows = table.getchildren()
    for count, row in enumerate(rows):
        if ((count == 0) or (count == len(rows) - 1)):
            continue
        name = ""
        vsol_id = 0
        for i, col in enumerate(row):
            if (i == 0):
                a = col.find_class('mnu')[0]
                name = a.text_content()
                href = a.attrib['href']
                vsol_id = int(href.split('=')[1])

        clubs.append({
            'name': name,
            'vsol_id': vsol_id,
            'country_id': country_id,
            'isHidden': False
        })

        #print (name, vsol_id)

    return clubs


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
    stadium = ''
    stadium = parent.getchildren()[-3].text_content()

    '''has_logo = False
    if (table.xpath("//a[@class='mnu']")):
        a = table.xpath("//a[@class='mnu']")[0]
        print(len(a))
        img = a.find("img")

    if (has_logo):
        print("%s?id=%d" % (LOGO_URL, vsol_id))'''

    print(name)
    print(stadium)


def get_hidden_clubs():
    numbers = 22
    clubs = {}
    for num in range(numbers):
        page = html.parse("%s?page=%d" % (HIDDEN_TEAMS_URL, num))
        table = page.getroot().find_class('tbl')[0]
        rows = table.getchildren()
        for count, row in enumerate(rows):
            if ((count == 0) or (count == len(rows) - 1)):
                continue
            name = ""
            country = ""
            for i, col in enumerate(row):
                if (i > 1):
                    continue
                if (i == 0):
                    name = col.find("a").text_content()
                if (i == 1):
                    country = col.attrib['title']

            if (country in clubs):
                clubs.get(country).append(name)
            else:
                clubs[country] = [name]

    od = collections.OrderedDict(sorted(clubs.items()))
    #for k, v in od.items():
        #print(k)

    #print(clubs["Россия"])

    return od


if __name__ == "__main__":
    '''clubs = get_hidden_clubs()
    for k, v in clubs.items():
        print(k)

    print(clubs["Россия"])'''

    print(get_countries())

    #print(get_clubs(1))

    #get_club(12135)
    #get_club(9768)
    #get_club(697)
    #get_club(19261)

    '''
    get_club_logo(697)
    get_club_logo(2)
    get_club_logo(12135)
    get_club_logo(101)
    '''
    
