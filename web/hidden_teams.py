import collections
import lxml.html as html

def get_hidden_clubs():
    base_url = 'http://virtualsoccer.ru/teams_hidden.php'
    numbers = 22
    clubs = {}
    for num in range(numbers):
        page = html.parse(base_url + "?page=" + str(num + 1))
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
    clubs = get_hidden_clubs()
    for k, v in clubs.items():
        print(k)

    print(clubs["Россия"])
    
