""" CRUD operations. """

from model import db, User, Game, connect_to_db


def create_game(name, description, game_image):
    return Game(name=name, description=description, game_image=game_image)