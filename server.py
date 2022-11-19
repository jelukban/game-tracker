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

    user_info = crud.find_user_by_email(email, password)

    if user_info == "User does not exist":
        flash('Please create an account.')
        return redirect('/login')
    else:
        user_info['has_account'] = True
        return jsonify(user_info)


@app.route('/api/create', methods=['POST'])
def create_user_account():
    """ Creates user account. """

    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')


    new_account = crud.create_user(fname=first_name,
                                lname=last_name,
                                email=email,
                                password=password)

    db.session.add(new_account)
    db.session.commit()

    flash('Successfully logged in!')

    return jsonify({'firstName': first_name,
                    'lastName': last_name,
                    'email': email,
                    'password': password,
                    'has_account': True})


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)