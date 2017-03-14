from flask import Flask, render_template
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "vsol_project"}
db = MongoEngine(app)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

from mod_main.controllers import mod_main as main_module

# Register blueprint(s)
app.register_blueprint(main_module)

if __name__ == '__main__':
    app.run()
