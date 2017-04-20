from flask import Flask, render_template
from flask_mongoengine import MongoEngine
from flask_script import Manager

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "vsol_project"}
db = MongoEngine(app)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.route('/')
def index():
    return render_template('index.html')


from web.mod_main.controllers import mod_main as main_module

# Register blueprint(s)
app.register_blueprint(main_module)


def init_actions():
    print('initActions!!!')

manager = Manager(app)

@manager.command
def runserver():
    app.run()
    init_actions()

if __name__ == '__main__':
    manager.run()
