import collections
import lxml.html as html

HIDDEN_TEAMS_URL = 'http://virtualsoccer.ru/teams_hidden.php'
COUNTRIES_URL = 'http://virtualsoccer.ru/teams.php'
COUNTRY_URL = 'http://virtualsoccer.ru/teams_cntr.php'

def get_countries():
    countries = []
    page = html.parse(COUNTRIES_URL)
    table = page.getroot().find_class('tbl')[0]
    rows = table.getchildren()
    for count, row in enumerate(rows):
        if ((count < 2) or (count == len(rows) - 1)):
            continue

        name = ''
        style = ''
        vsol_id = 0
        for i, col in enumerate(row):
            if (i > 1):
                continue

            if (i == 0):
                name = col.attrib['title']
                style = col.find("div").attrib['style']

                #countries.append(name)
                #print(name, style)
            if (i == 1):
                href = col.getchildren()[0].find('a').attrib['href']
                vsol_id = int(href.split('=')[1])

        countries.append({
            'name': name,
            'style': style,
            'vsol_id': vsol_id
        })
            
    return countries

def get_clubs():
    countries = get_countries()
    clubs = {}
    for country in countries:
        page = html.parse("%s?num=%d" % (COUNTRY_URL, country['vsol_id']))
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

            print (name, vsol_id)


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

    #print(get_countries())

    print(get_clubs())
    
