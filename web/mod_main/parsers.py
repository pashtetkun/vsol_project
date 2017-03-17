import collections
import lxml.html as html

HIDDEN_TEAMS_URL = 'http://virtualsoccer.ru/teams_hidden.php'
COUNTRIES_URL = 'http://virtualsoccer.ru/teams.php'

def get_countries():
    countries = []
    page = html.parse(COUNTRIES_URL)
    table = page.getroot().find_class('tbl').pop()
    rows = table.getchildren()
    for count, row in enumerate(rows):
        if ((count < 2) or (count == len(rows) - 1)):
            continue

        for i, col in enumerate(row):
            if (i == 0):
                name = col.attrib['title']
                style = col.find("div").attrib['style']
                countries.append(name)
                print(name, style)

    return countries


def get_hidden_clubs():
    numbers = 22
    clubs = {}
    for num in range(numbers):
        page = html.parse("%s?page=%d" % (HIDDEN_TEAMS_URL, num))
        table = page.getroot().find_class('tbl').pop()
        rows = table.getchildren()
        for count, row in enumerate(rows):
            if ((count == 0) or (count == len(rows) - 1)):
                continue
            name = ""
            country = ""
            for i, col in enumerate(row):
                if (i == 0):
                    a = col.find("a")
                    name = a.text_content()
                if (i == 1):
                    country = col.attrib['title']
                if (i > 1):
                    continue

            if (country in clubs):
                clubs.get(country).append(name)
            else:
                lst = []
                lst.append(name)
                clubs[country] = lst

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

    get_countries()
    
