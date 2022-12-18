
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
        return jsonify({'status':'Account not found'})
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


    if len(email) > 5 and len(password) > 8:
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
    else:
        return jsonify({'status':'Requirements not filled'})


@app.route('/api/games/details/<game_id>')
def show_game_information(game_id):
    """ Shows details for individual game. """

    game = crud.get_game_by_id(game_id)

    ave_score = crud.get_average_rating_by_id(game_id)

    if ave_score != 'No ratings for this game':
        game['score'] = int(ave_score)

    return jsonify(game)


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


@app.route('/api/dashboard/<user_id>')
def get_user_recommendations(user_id):

    games = crud.select_user_recommendations(user_id)

    return jsonify({'games': games})


@app.route('/api/followuser', methods=['POST'])
def follow_another_user():

    data = request.get_json()

    follower_id = data.get('followerId')
    following_id = data.get('followingId')

    follow = crud.create_user_follow(follower_user_id= follower_id,
                                        following_user_id=following_id)

    if follow != 'User is already following this user':
        db.session.add(follow)
        db.session.commit()
    else:
        return 'User is already following this person!'


@app.route('/api/search/user/email', methods=['POST'])
def retrieve_user_data_by_email():
    data = request.get_json()

    email = data.get('email')

    user_info = crud.get_user_search_results(email=email)
    if user_info != 'This user does not exist!':
        user_info['status'] = 'Account found!'
        return jsonify(user_info)
    else:
        return jsonify({'status':'Account not found'})

@app.route('/api/dashboard/<user_id>/follows')
def retrieve_user_follows(user_id):

    followings = crud.retrieve_all_followings_for_user(follower_user_id=user_id)

    if len(followings) != 0:
        return jsonify(followings)
    else:
        return jsonify({'status':'User has no follows'})

@app.route('/api/search/user/id', methods=['POST'])
def retrieve_user_data_by_id():
    data = request.get_json()


    id = data.get('id')
    user_info = crud.get_user_search_results_by_id(user_id=id)
    if user_info != 'This user does not exist!':
        user_info['status'] = 'Account found!'
        return jsonify(user_info)
    else:
        return jsonify({'status':'Account not found'})

@app.route('/api/search/user/add', methods=['POST'])
def create_user_follow():

    data = request.get_json()

    follower_user_id = data.get('followUserId')
    following_user_id = data.get('followingUserId')

    follow = crud.create_user_follow(follower_user_id=follower_user_id,
                                        following_user_id=following_user_id)

    if follow != 'User is already following this user':
        db.session.add(follow)
        db.session.commit()
        return jsonify({'status': 'Follow was made!'})
    else:
        return jsonify({'status': 'User is already following this user'})

if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)