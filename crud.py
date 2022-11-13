""" CRUD operations. """

from model import db, User, Game, GameGenre, Cover, connect_to_db


def create_game(id, name, description, cover_id, release_date):
    """ Creates a video game to add to the Game db. """

    return Game(id=id,
        name=name,
        description=description,
        cover_id=cover_id,
        release_date=release_date)

def create_cover(id, url):
    """ Created cover. """

    return Cover(id=id, url=url)

def get_all_games():
    """ Returns all video games in the Game db. """

    games = db.session.query(Game).all()

    final_json = []

    for game in games:
        final_json.append(game.to_json())

    return final_json

def get_all_covers():
    """ Returns list of all cover urls. """
    return db.session.query(Cover).all()

if __name__ == '__main__':

    from server import app
    connect_to_db(app)