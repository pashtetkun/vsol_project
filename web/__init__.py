from flask import Flask, render_template, Response
import json

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
    countries = []
    countries.append('Россия')
    countries.append('Япония')
    return resp(200, {"resultStatus": "SUCCESS", "result": countries})

if __name__ == '__main__':
    app.run()
