""" Models for video game tracker """

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Game(db.Model):
    """ A game. """

    __tablename__ = 'games'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=True)
    game_image = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Id = {self.id}, Name = {self.name}>"


class User(db.Model):
    """ A user. """

    ___tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Id = {self.id}, Name = {self.fname} {self.lname}>"


class Rating(db.Model):
    """ A rating for individual video games made by a user. """

    ___tablename__ = 'ratings'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = None
    user_id = None
    score = db.Column(db.Integer)

    def __repr__(self):
        return f"<Id = {self.id} Rating for Game({self.game_id}) by User({self.user_id})>"


class Interest(db.Model):
    """ A video game classified as interesting by a user. """

    ___tablename__ = 'interests'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = None
    user_id = None

    def __repr__(self):
        return f"<Id = {self.id} User({self.user_id}) interested in Game({self.game_id})>"


class GamePlayed(db.Model):
    """ A video game that a user has previously played. """

    __tablename__ = 'games_played'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = None
    user_id = None

    def __repr__(self):
        return f"<Id = {self.id} User({self.user_id}) played Game({self.game_id})>"


class Genre(db.model):
    """ Different video game genres. """

    __tablename__ = 'genres'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Id = {self.id} Genre Name = {self.name}>"


class Platform(db.Model):
    """ Various gaming platforms. """

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Id = {self.id} Platform Name = {self.name}>"


class GameGenre(db.Model):
    """ Video games and their associated genres. """

    ___tablename__ = 'game_genres'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = None
    genre_id = None

    def __repr__(self):
        return f"<Id = {self.id} Game = {self.game_id} Genre = {self.genre_id}"


class GamePlatform(db.Model):
    """ Video games and their associated platforms. """

    __tablename__ = 'game_platforms'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = None
    platform_id = None

    def __repr__(self):
        return f"<Id = {self.id} Game = {self.game_id} Genre = {self.platform_id}"