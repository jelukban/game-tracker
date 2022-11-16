from crypt import methods
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, db, Rating
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def show_homepage():
    """ Goes to homepage. """

    return render_template('index.html')


@app.route('/api/games')
def get_games_json():
    """ Return a JSON response with all video games. """

    games = crud.get_all_games()

    return jsonify({'games': games})


@app.route('/api/login', methods=['POST'])
def check_user_login():
    """ Checks user logged in information against db. """

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    return None

if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)