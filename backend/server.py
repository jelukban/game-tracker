
from flask import Flask, render_template, request, flash, redirect, jsonify
from model import connect_to_db, db, Rating
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


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
        # flash('Please create an account.')
        return redirect('/login')
    else:
        user_info['has_account'] = 'True'
        return jsonify(user_info)


@app.route('/api/create', methods=['POST'])
def create_user_account():
    """ Creates user account. """

    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    user_info = crud.find_user_by_email(email=email, password=password)


    if user_info == "User does not exist":
        new_account = crud.create_user(fname=first_name,
                                lname=last_name,
                                email=email,
                                password=password)

        db.session.add(new_account)
        db.session.commit()

        user_info = crud.find_user_by_email(email, password)
        user_info['has_account'] = 'True'

    else:
        user_info['has_account'] = 'True'

    return jsonify(user_info)


@app.route('/api/games/details/<game_id>')
def show_game_information(game_id):
    """ Shows details for individual game. """

    game = crud.get_game_by_id(game_id)

    return jsonify({'id': game.id,
                    'name': game.name,
                    'description':game.description,
                    'release_date':game.release_date,
                    'cover_url':game.cover_url})


@app.route('/api/createinterest', methods=['POST'])
def create_interest_game_by_user():

    data = request.get_json()

    game_id = data.get('game_id')
    user_id = data.get('user_id')

    interest = crud.create_interest(game_id=int(game_id),
                                    user_id=int(user_id))

    db.session.add(interest)
    db.session.commit()

    return jsonify({'user_id': user_id,
                    'game_id': game_id})


@app.route('/api/games/interests', methods=['POST'])
def get_all_games_of_interest():

    data = request.get_json()
    user_id = data.get('id')

    games = crud.get_interesting_games_by_user_id(user_id)

    return jsonify({'games': games})


@app.route('/api/createplayed', methods=['POST'])
def create_played_game_by_user():

    data = request.get_json()

    game_id = data.get('game_id')
    user_id = data.get('user_id')

    played = crud.create_game_played(game_id=int(game_id),
                                    user_id=int(user_id))

    db.session.add(played)
    db.session.commit()

    return jsonify({'user_id': user_id,
                    'game_id': game_id})


@app.route('/api/games/gamesplayed', methods=['POST'])
def get_all_played_games():

    data = request.get_json()
    user_id = data.get('id')

    games = crud.get_games_played_by_user(user_id)

    return jsonify({'games': games})


@app.route('/api/search/name', methods=['POST'])
def get_search_results():

    data = request.get_json()

    search_name = data.get('searchName')

    games = crud.search_for_game(search_name)

    return jsonify({'games':games})


@app.route('/api/<game_id>/createrating', methods=['POST'])
def create_video_game_rating(game_id):

    data = request.get_json()

    user_id = data.get('user_id')
    score = data.get('score')

    rating = crud.create_rating_for_game(game_id=game_id,
                                            user_id=user_id,
                                            score=score)

    db.session.add(rating)
    db.session.commit()

    return('your video game was created!')


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)