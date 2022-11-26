""" CRUD operations. """

from model import db, User, Game, GameGenre, connect_to_db, Interest, GamePlayed

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

    for game in games:
        final_json.append(game.to_json())

    return final_json


def get_all_users():
    """ Returns all users. """

    return db.session.query(User).all()


def check_if_user_exists(email, password):
    """ Checks to see if user exists in the database. """

    return True if db.session.query(User).filter(User.email == email, User.password == password).one() else False


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

    return db.session.query(Game).get(game_id)


def show_games_played_by_user(user_id):
    """ Returns games played by specific user. """

    return db.session.query(GamePlayed).filter(GamePlayed.user_id == user_id).all()


def search_for_game(name):
    """ Returns game from search bar. """

    return db.session.query(Game).filter(Game.name.like(f'%{name}%'))


if __name__ == '__main__':

    from server import app
    connect_to_db(app)