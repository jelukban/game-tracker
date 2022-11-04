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

    ratings = db.relationship('Rating', back_populates='game')
    interests = db.relationship('Interest', back_populates='game')
    games_played = db.relationship('GamePlayed', back_populates='game')
    platforms = db.relationship('Platform', secondary='game_platforms', back_populates='games')
    genres = db.relationship('Genre', secondary='game_genres', back_populates='games')


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

    ratings = db.relationship('Rating', back_populates='user')
    interests = db.relationship('Interest', back_populates='user')
    games_played = db.relationship('GamePlayed', back_populates='user')

    def __repr__(self):
        return f"<Id = {self.id}, Name = {self.fname} {self.lname}>"


class Rating(db.Model):
    """ A rating for individual video games made by a user. """

    ___tablename__ = 'ratings'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    score = db.Column(db.Integer)

    game = db.relationship('Game', back_populates='ratings')
    user = db.relationship('User', back_populates='ratings')

    def __repr__(self):
        return f"<Id = {self.id} Rating for Game({self.game_id}) by User({self.user_id})>"


class Interest(db.Model):
    """ A video game classified as interesting by a user. """

    ___tablename__ = 'interests'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    game = db.relationship('Game', back_populates='interests')
    user = db.relationship('User', back_populates='interests')

    def __repr__(self):
        return f"<Id = {self.id} User({self.user_id}) interested in Game({self.game_id})>"


class GamePlayed(db.Model):
    """ A video game that a user has previously played. """

    __tablename__ = 'games_played'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    game = db.relationship('Game', back_populates='games_played')
    user = db.relationship('User', back_populates='games_played')

    def __repr__(self):
        return f"<Id = {self.id} User({self.user_id}) played Game({self.game_id})>"


class Genre(db.model):
    """ Different video game genres. """

    __tablename__ = 'genres'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)

    games = db.relationship('Game', secondary='game_genres', back_populates='genres')

    def __repr__(self):
        return f"<Id = {self.id} Genre Name = {self.name}>"


class Platform(db.Model):
    """ Various gaming platforms. """

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)

    games = db.relationship('Game', secondary='game_platforms', back_populates='platforms')

    def __repr__(self):
        return f"<Id = {self.id} Platform Name = {self.name}>"


class GameGenre(db.Model):
    """ Video games and their associated genres. """

    ___tablename__ = 'game_genres'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))


    def __repr__(self):
        return f"<Id = {self.id} Game = {self.game_id} Genre = {self.genre_id}"


class GamePlatform(db.Model):
    """ Video games and their associated platforms. """

    __tablename__ = 'game_platforms'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    platform_id = db.Column(db.Integer, db.ForeignKey('platforms.id'))


    def __repr__(self):
        return f"<Id = {self.id} Game = {self.game_id} Genre = {self.platform_id}"


def connect_to_db(flask_app, db_uri="postgresql:///games", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)