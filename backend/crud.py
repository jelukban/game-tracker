""" CRUD operations. """

from model import db, User, Game, GameGenre, Genre, Platform, GamePlatform, \
                connect_to_db, Interest, GamePlayed, Rating
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

    return Interest(game_id=game_id,
                    user_id=user_id)


def create_game_played(game_id, user_id):
    """ Created a game that the user is interested in. """

    return GamePlayed(game_id=game_id,
                    user_id=user_id)


def get_all_games():
    """ Returns all video games in the Game db. """

    games = db.session.query(Game).all()

    final_json = []

    count = 0

    for game in games:
        final_json.append(game.to_json())
        if count == 10:
            break
        count += 1

    return final_json


def get_all_users():
    """ Returns all users. """

    return db.session.query(User).all()


def check_if_user_exists(email, password):
    """ Checks to see if user exists in the database. """

    return True if db.session.query(User).filter(User.email == email, User.password == password).first() else False


def find_user_by_email(email, password):
    """ Finds user by email. """

    if check_if_user_exists(email, password):
        user = db.session.query(User).filter(User.email == email).one()

        return {'user_id': user.id,
                'first_name': user.fname,
                'last_name': user.lname,
                'email': user.email,
                'password': user.password}
    else:
        return("User does not exist")


def get_game_by_id(game_id):
    """ Returns game information by id. """

    game = db.session.query(Game).get(game_id)

    return game.to_json()


def get_interesting_games_by_user_id(user_id):
    """ Returns interesting games by user_id. """

    games = db.session.query(Interest).options(db.joinedload('game')).filter(Interest.user_id == user_id).all()

    return [game.game.to_json() for game in games]


def get_games_played_by_user(user_id):
    """ Returns games played by specific user. """

    games = db.session.query(GamePlayed).options(db.joinedload('game')).filter(GamePlayed.user_id == user_id).all()

    return [game.game.to_json() for game in games]


def search_for_game(search_name):
    """ Returns game from search bar. """

    games = db.session.query(Game).filter(Game.name.ilike(f'%{search_name}%')).all()

    return [game.to_json() for game in games]


def create_rating_for_game(game_id, user_id, score):
    """ Makes a game rating for a game. """

    return Rating(game_id=game_id,
                user_id=user_id,
                score=score)


def create_genre(id, name):

    if db.session.query(Genre).filter(Genre.id == id).first():
        return 'This genre has already been added'
    else:
        return Genre(id=id, name=name)


def create_platform(id, name):

    if db.session.query(Platform).filter(Platform.id == id).first():
        return 'This genre has already been added'
    else:
        return Platform(id=id, name=name)


def create_game_genre(game_id, genre_id):

    return GameGenre(game_id=game_id, genre_id=genre_id)


def create_game_platform(game_id, platform_id):

    return GamePlatform(game_id=game_id, platform_id=platform_id)


def get_average_rating_by_id(game_id):

    nums = db.session.query(func.round(func.avg(Rating.score).\
        label('average'), 2)).filter(Rating.game_id == game_id).\
            group_by(Rating.game_id).first()

    return nums[0] if nums else 'No ratings for this game'


def get_genres_most_played(user_id):

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
        count[genre] = round((count[genre]/total),2)

    return(count)


def select_user_recommendations(user_id):

    genre_count = get_genres_most_played(user_id)
    genres = [genre for genre in genre_count]

    games = db.session.query(Game).filter(Game.genres.any(Genre.name.in_(genres))).order_by(func.random()).limit(20).all()


    recommendations = [game.to_json() for game in games]

    return recommendations


if __name__ == '__main__':

    from server import app
    connect_to_db(app)