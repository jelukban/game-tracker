import os
import requests
from datetime import datetime
import model
import crud
import server

os.system("dropdb game_tracker")
os.system('createdb game_tracker')

model.connect_to_db(server.app)
model.db.create_all()

API_ID = os.environ['CLIENT_ID']

API_SECRET = os.environ['CLIENT_SECRET']

url = f"https://id.twitch.tv/oauth2/token?client_id={API_ID}&client_secret={API_SECRET}&grant_type=client_credentials"
res = requests.post(url)
access_token = res.json()
access_token = access_token['access_token']

payload = {'Client-ID': API_ID,
'Authorization': f"Bearer {access_token}"}


### to fix seeding, query one at a time and then add it, do last
i = 0
while i < 215000:

    data = f'query games "Games" {{fields id, name, platforms.name, storyline, genres.name, cover.url, first_release_date; sort id asc; limit 500; offset {i};}};'
    req = requests.post('https://api.igdb.com/v4/multiquery', data=data, headers=payload)
    search_results = req.json()

    search_results = search_results[0].get('result')

    for game in search_results:
        id = game.get('id')
        name = game.get('name')
        description = game.get('storyline')
        cover_url = game.get('cover')
        release_date = game.get('first_release_date')

        if cover_url:
            cover_url = cover_url.get('url')

        if release_date:
            release_date = datetime.fromtimestamp(int(release_date))

        if name and id and cover_url:
            id = int(id)


            new_game = crud.create_game(id=id,
                                    name=name,
                                    description=description,
                                    cover_url=cover_url,
                                    release_date=release_date)
            model.db.session.add(new_game)
            model.db.session.commit()

            if game.get('genres'):
                for genre in game.get('genres'):
                    genre_id = genre.get('id')
                    genre_id = int(genre_id)
                    genre_name = genre.get('name')

                    genre = crud.create_genre(id=genre_id, name=genre_name)

                    if genre == 'This genre has already been added':
                        continue
                    else:
                        model.db.session.add(genre)
                        model.db.session.commit()

                    game_genre = crud.create_game_genre(game_id=id,
                                                        genre_id=genre_id)
                    model.db.session.add(game_genre)
                    model.db.session.commit()

            if game.get('platforms'):
                for platform in game.get('platforms'):
                    platform_id = platform.get('id')
                    platform_id = int(platform_id)
                    platform_name = platform.get('name')

                    platform = crud.create_platform(id=platform_id, name=platform_name)

                    if platform == 'This genre has already been added':
                        continue
                    else:
                        model.db.session.add(platform)
                        model.db.session.commit()

                    game_platform = crud.create_game_platform(game_id=id,
                                                                platform_id=platform_id)
                    model.db.session.add(game_platform)
                    model.db.session.commit()

    i += 500


## Adding in test users
user = crud.create_user(fname='Jane',lname='Doe', email='test@tst.com',
                        password='aaa')

model.db.session.add(user)

model.db.session.commit()