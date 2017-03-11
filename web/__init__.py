from flask import Flask, render_template, Response
import json
import hidden_teams

app = Flask(__name__)

def to_json(data):
    return json.dumps(data) + "\n"

def resp(code, data):
    return Response(
        status=code,
        mimetype="application/json",
        response=to_json(data)
    )





@app.route('/')
def index():
    return render_template('index.html')

@app.route('/adminApi/hiddenCountries', methods=['GET'])
def get_hiddenCountries():
    #countries = []
    #countries.append('Россия')
    #countries.append('Япония')
    dict_clubs = hidden_teams.get_hidden_clubs()
    clubs = []
    for k,v in dict_clubs.items():
        club = {}
        club['country'] = k
        club['clubs'] = v
        clubs.append(club)
    return resp(200, {"resultStatus": "SUCCESS", "result": clubs})

if __name__ == '__main__':
    app.run()
