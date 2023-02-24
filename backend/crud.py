""" CRUD operations. """

from model import db, User, Game, GameGenre, Genre, Platform, GamePlatform, \
    connect_to_db, Interest, GamePlayed, Rating, Following
from sqlalchemy import func


def create_game(id, name, description, cover_url, release_date):
    """ Creates a video game to add to the Game db. """

    return Game(id=id,
                name=name,
                description=description,
                cover_url=cover_url,
                release_date=release_date)


def create_user(fname, lname, email, password):
    """ Creates a user to add to User db."""

    return User(fname=fname,
                lname=lname,
                email=email,
                password=password)


def create_interest(game_id, user_id):
    """ Created a game that the user is interested in. """

    interest = db.session.query(Interest).filter(
        Interest.game_id == game_id, Interest.user_id == user_id).first()

    if not interest:
        return Interest(game_id=game_id,
                        user_id=user_id)
    else:
        return 'User has already interested this game'


def create_game_played(game_id, user_id):
    """ Created a game that the user is interested in. """

    gameplayed = db.session.query(GamePlayed).filter(
        GamePlayed.game_id == game_id, GamePlayed.user_id == user_id).first()

    if not gameplayed:
        return GamePlayed(game_id=game_id,
                          user_id=user_id)
    else:
        return 'User has already played this game'


def get_all_games():
    """ Returns all video games in the Game db. """

    games = db.session.query(Game).order_by(func.random()).limit(50).all()

    return [game.to_json() for game in games]


def get_all_users():
    """ Returns all users. """

    return db.session.query(User).all()


def verify_user_login(email, password):
    """ Checks to see if user login matches. """

    return True if db.session.query(User).filter(User.email == email, User.password == password).first() else False


def create_account(email, password):
    """ Finds user by email. """
    user = db.session.query(User).filter(User.email == email).first()

    if verify_user_login(email, password):

        return {'user_id': user.id,
                'first_name': user.fname,
                'last_name': user.lname,
                'email': user.email,
                'password': user.password}
    elif user:
        return "Email already exists"
    else:
        return "User does not exist"


def find_account(email, password):
    """ Finds user by email. """
    user = db.session.query(User).filter(User.email == email).first()

    if verify_user_login(email, password):

        return {'user_id': user.id,
                'first_name': user.fname,
                'last_name': user.lname,
                'email': user.email,
                'password': user.password}
    else:
        return "User does not exist"


def get_game_by_id(game_id):
    """ Returns game information by id. """

    game = db.session.query(Game).get(game_id)

    return game.to_json()


def get_interesting_games_by_user_id(user_id):
    """ Returns interesting games by user_id. """

    games = db.session.query(Interest).options(db.joinedload(
        'game')).filter(Interest.user_id == user_id).all()

    return [game.game.to_json() for game in games]


def get_games_played_by_user(user_id):
    """ Returns games played by specific user. """

    games = db.session.query(GamePlayed).options(db.joinedload(
        'game')).filter(GamePlayed.user_id == user_id).all()

    return [game.game.to_json() for game in games]


def search_for_game_by_name(search_name):
    """ Returns game from search bar. """

    games = db.session.query(Game).filter(
        Game.name.ilike(f'%{search_name}%')).all()

    return [game.to_json() for game in games]


def create_rating_for_game(game_id, user_id, score):
    """ Makes a game rating for a game. """

    return Rating(game_id=game_id,
                  user_id=user_id,
                  score=score)


def create_genre(id, name):
    """ Creates a Genre. """

    if db.session.query(Genre).filter(Genre.id == id).first():
        return 'This genre has already been added'
    else:
        return Genre(id=id, name=name)


def create_platform(id, name):
    """ Created a Platform. """

    if db.session.query(Platform).filter(Platform.id == id).first():
        return 'This genre has already been added'
    else:
        return Platform(id=id, name=name)


def create_game_genre(game_id, genre_id):
    """ Creates an associated game and genre. """

    return GameGenre(game_id=game_id, genre_id=genre_id)


def create_game_platform(game_id, platform_id):
    """ Creates an associated game and platform. """

    return GamePlatform(game_id=game_id, platform_id=platform_id)


def get_average_rating_by_id(game_id):
    """ Calculates the average rating given per game. """

    nums = db.session.query(func.round(func.avg(Rating.score).
                                       label('average'), 2)).filter(Rating.game_id == game_id).\
        group_by(Rating.game_id).first()

    return nums[0] if nums else 'No ratings for this game'


def get_most_interested_genres(user_id):
    """ Tracks the genres played by a user. """

    count = {}
    total = 0

    user = db.session.query(User).options(db.joinedload('interests', 'game'))\
        .filter(User.id == user_id).first()
    for game in user.interests:
        print(game)
        for genre in game.game.genres:
            if genre.name in count:
                count[genre.name] += 1
            else:
                count[genre.name] = 1

    for num in count.values():
        total += num

    for genre in count:
        count[genre] = round((count[genre]/total), 2)

    return (count)


def select_user_recommendations(user_id):
    """ Randomly selects 20 games based on user interested genres. """

    genre_count = get_most_interested_genres(user_id)
    genres = [genre for genre in genre_count]

    games = db.session.query(Game).filter(Game.genres.any(
        Genre.name.in_(genres))).order_by(func.random()).limit(20).all()

    recommendations = [game.to_json() for game in games]

    return recommendations


def create_user_follow(follower_user_id, following_user_id):
    """ Creates a follow for a user. """

    if not db.session.query(Following).filter(Following.follower_user_id == follower_user_id,
                                              Following.following_user_id == following_user_id).first():
        return Following(follower_user_id=follower_user_id,
                         following_user_id=following_user_id)
    else:
        return 'User is already following this user'


def get_user_search_results(email, follower_user_id):
    """ Finds user by email. """

    user = db.session.query(User).filter(User.email == email).first()

    if user:
        follow = db.session.query(Following).filter(Following.follower_user_id == follower_user_id,
                                                    Following.following_user_id == user.id).first()

        if follow:
            return {'id': user.id,
                    'firstName': user.fname,
                    'lastName': user.lname,
                    'email': user.email,
                    'follow_status': 'true'}
        else:
            return {'id': user.id,
                    'firstName': user.fname,
                    'lastName': user.lname,
                    'email': user.email,
                    'follow_status': 'false'}
    else:
        return 'This user does not exist!'


def retrieve_all_followings_for_user(follower_user_id):
    """ Returns list of all users a user is following. """

    follows = []

    follow_query = db.session.query(Following, User)\
        .join(User, Following.following_user_id == User.id)\
        .filter(Following.follower_user_id == follower_user_id).all()

    if len(follow_query) != 0:
        for _, info in follow_query:

            follows.append({'id': info.id,
                            'firstName': info.fname,
                            'lastName': info.lname,
                            'email': info.email,
                            'follow_status': 'true'})

    return follows


def get_user_search_results_by_id(user_id):
    """ Finds user by user id. """

    user = db.session.query(User).filter(User.id == user_id).first()

    if user:
        return {'id': user.id,
                'firstName': user.fname,
                'lastName': user.lname,
                'email': user.email,
                'password': user.password}
    else:
        return 'This user does not exist!'


def delete_a_follow(follower_user_id, following_user_id):
    """ Deletes a follow between users. """

    follow = db.session.query(Following).filter(Following.follower_user_id == follower_user_id,
                                                Following.following_user_id == following_user_id).first()

    if follow:
        db.session.delete(follow)
    else:
        return 'Follow does not exist'


def delete_an_interest(game_id, user_id):
    """ Deleted an interest marked by a user. """

    interest = db.session.query(Interest).filter(Interest.game_id == game_id,
                                                 Interest.user_id == user_id).first()

    if interest:
        db.session.delete(interest)
        return 'Interest deleted'
    else:
        return "Interest does not exist"


def delete_a_game_played(game_id, user_id):
    """ Deleted a played game marked by user.  """

    game_played = db.session.query(GamePlayed).filter(GamePlayed.game_id == game_id,
                                                      GamePlayed.user_id == user_id).first()

    if game_played:
        db.session.delete(game_played)
        return 'Game played deleted'
    else:
        return "Game played does not exist"


def get_game_statuses(game_id, user_id):
    """ Retrieve user-specific statuses for a video game. """

    interest_status = db.session.query(Interest).filter(Interest.game_id == game_id,
                                                        Interest.user_id == user_id).first()
    played_status = db.session.query(GamePlayed).filter(GamePlayed.game_id == game_id,
                                                        GamePlayed.user_id == user_id).first()

    statuses = {'interest': False, 'game_played': False}

    if interest_status:
        statuses['interest'] = True

    if played_status:
        statuses['game_played'] = True

    return statuses


if __name__ == '__main__':

    from server import app
    connect_to_db(app)
