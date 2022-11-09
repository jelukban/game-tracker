""" CRUD operations. """

from model import db, User, Game, connect_to_db


def create_game(name, description, game_image, release_date):
    """ Creates a video game to add to the Game db. """

    return Game(name=name,
        description=description,
        game_image=game_image,
        release_date=release_date)


def get_all_games():
    """ Returns all video games in the Game db. """

    return db.session.query(Game).all()

if __name__ == '__main__':

    from server import app
    connect_to_db(app)