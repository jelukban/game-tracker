from flask import Flask, render_template, request, flash, redirect, jsonify
from model import connect_to_db, db, Rating
import json
import crud

app = Flask(__name__)
app.secret_key = "dev"

HTTP_RESPONSE_CODES = {
    "noContent": 204,
    "unauthorized": 401,
    "forbidden": 403,
    "doesntExist": 404,
    "methodNotAllowed": 405,
    "notAcceptable": 406,
    "conflict": 409,
    "unprocessedEntity": 422,
    "serverError": 500
}


@app.route('/games')
def get_games_json():
    """ Return a JSON response with all video games. """

    games = crud.get_all_games()

    return jsonify({'games': games})


@app.route('/login', methods=['POST'])
def check_user_login():
    """ Checks user logged in information against db. """

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user_info = crud.find_account(email, password)

    if user_info == "User does not exist":
        return jsonify({'status': 'Account not found'})
    else:
        user_info['has_account'] = 'True'
        return jsonify(user_info)


@app.route('/register', methods=['POST'])
def create_user_account():
    """ Creates user account. """

    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if len(email) > 5 and len(password) >= 6:
        user_info = crud.create_account(email=email, password=password)

        if user_info == "User does not exist":
            new_account = crud.create_user(fname=first_name,
                                           lname=last_name,
                                           email=email,
                                           password=password)

            db.session.add(new_account)
            db.session.commit()

            user_info = crud.find_account(email, password)
            user_info['has_account'] = 'True'

        elif user_info == "Email already exists":
            return jsonify({'status': 'Account with this email already exists'})
        else:
            user_info['has_account'] = 'True'

        return jsonify(user_info)

    else:
        return jsonify({'status': 'Requirements not filled'})


@app.route('/games/<game_id>')
def show_game_information(game_id):
    """ Shows details for individual game. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('user_id')

    game = crud.get_game_by_id(game_id)
    ave_score = crud.get_average_rating_by_id(game_id)
    statuses = crud.get_game_statuses(game_id, user_id)

    if ave_score != 'No ratings for this game':
        game['score'] = float(ave_score)

    game['interest_status'] = statuses['interest']
    game['game_played_status'] = statuses['game_played']

    return jsonify(game)


@app.route('/games/<game_id>/interest', methods=['POST'])
def create_interest_game_by_user(game_id):
    """ Creates an interested game for a user. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('user_id')

    interest = crud.create_interest(game_id=int(game_id),
                                    user_id=int(user_id))

    if interest != 'User has already interested this game':
        db.session.add(interest)
        db.session.commit()

        return jsonify({'user_id': user_id,
                        'game_id': game_id,
                        'status': 'Interest made'})
    else:
        return jsonify({'status': 'Interest exists'})


@app.route('/user/interests')
def get_all_games_of_interest():
    """ Returns all games interested by a user. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('id')

    games = crud.get_interesting_games_by_user_id(user_id)

    return jsonify({'games': games})


@app.route('/games/<game_id>/played', methods=['POST'])
def create_played_game_by_user(game_id):
    """ Created a played game for a user. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('user_id')

    played = crud.create_game_played(game_id=int(game_id),
                                     user_id=int(user_id))

    if played != 'User has already played this game':
        db.session.add(played)
        db.session.commit()

        return jsonify({'user_id': user_id,
                        'game_id': game_id,
                        'status': 'GamePlayed was made'})
    else:
        return jsonify({'status': 'GamePlayed exists'})


@app.route('/user/played')
def get_all_played_games():
    """ Returns all games played by a user. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('id')

    games = crud.get_games_played_by_user(user_id)

    return jsonify({'games': games})


@app.route('/search')
def get_search_results():
    """ Returns games matching search input. """

    game_name = request.args.get('gameName')
    games = crud.search_for_game_by_name(game_name)

    return jsonify({'games': games})


@app.route('/games/<game_id>/rating', methods=['POST'])
def create_video_game_rating(game_id):
    """ Creates a rating for a video game by user. """

    data = request.get_json()

    user_id = data.get('user_id')
    score = data.get('score')

    rating = crud.create_rating_for_game(game_id=game_id,
                                         user_id=user_id,
                                         score=score)

    db.session.add(rating)
    db.session.commit()

    return ('your video game was created!')


@app.route('/user/recommendations')
def get_user_recommendations():
    """ Returns user recommended games based on interested genres. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('id')

    games = crud.select_user_recommendations(user_id)

    return jsonify({'games': games})


@app.route('/api/search/user/email', methods=['POST'])
def retrieve_user_data_by_email():
    """ Finds user by email and returns user information. """

    data = request.get_json()

    email = data.get('email')
    follower_user_id = data.get('followerId')

    user_info = crud.get_user_search_results(email=email,
                                             follower_user_id=follower_user_id)

    if user_info != 'This user does not exist!':
        user_info['status'] = 'Account found!'
        return jsonify(user_info)
    else:
        return jsonify({'status': 'Account not found'})


@app.route('/user/followings')
def retrieve_user_follows():
    """ Returns all users followed by a user. """

    data = request.headers
    user = json.loads(data.get('User'))
    user_id = user.get('id')

    followings = crud.retrieve_all_followings_for_user(
        follower_user_id=user_id)

    if len(followings) != 0:
        return jsonify(followings)
    else:
        return jsonify({'status': 'User has no follows'})


@app.route('/api/search/user/id', methods=['POST'])
def retrieve_user_data_by_id():
    """ Returns user information by user id. """

    data = request.get_json()

    id = data.get('id')
    user_info = crud.get_user_search_results_by_id(user_id=id)

    if user_info != 'This user does not exist!':
        user_info['status'] = 'Account found!'
        return jsonify(user_info)
    else:
        return jsonify({'status': 'Account not found'})


@app.route('/follow', methods=['PUT'])
def follow_another_user():
    """ Creates a follow by a user. """

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


@app.route('/unfollow', methods=['PUT'])
def unfollow_another_user():
    """ Deletes a follow from a user in search bar. """

    data = request.get_json()

    follower_user_id = data.get('followUserId')
    following_user_id = data.get('followingUserId')

    result = crud.delete_a_follow(follower_user_id=follower_user_id,
                                  following_user_id=following_user_id)

    if result == 'Follow does not exist':
        return jsonify({'status': 'User is not following this user'})
    else:
        db.session.commit()
        return jsonify({'status': 'Follow deleted'})


@app.route('/games/<game_id>/interest', methods=['DELETE'])
def delete_game_interested_by_user(game_id):

    data = request.get_json()

    user_id = data.get('user_id')

    result = crud.delete_an_interest(game_id=game_id,
                                     user_id=user_id)

    if result == 'Interest deleted':
        db.session.commit()
        return jsonify({'status': 'Interest deleted'})
    else:
        return jsonify({'status': 'Interest does not exist'})


@app.route('/games/<game_id>/played', methods=['DELETE'])
def delete_game_played_by_user(game_id):

    data = request.get_json()

    user_id = data.get('user_id')

    result = crud.delete_a_game_played(game_id=game_id,
                                       user_id=user_id)

    if result == 'Game played deleted':
        db.session.commit()
        return jsonify({'status': 'Game played deleted'})
    else:
        return jsonify({'status': 'Game played does not exist'})


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
