import os
import json
import requests
from random import choice, randint
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



#### Convert ids to integer

### Seeding Genre db


### Seeding Cover information
i = 0
while i < 200000:

    data = f'fields id, url; limit 500; offset {i};'

    req = requests.post('https://api.igdb.com/v4/covers', data=data, headers=payload)
    search_results = req.json()


    for cover in search_results:
        id = cover.get('id')

        if id:
            id = int(id)

        url = cover.get('url')
        url = url[2:]

        # video_game_cover_ids = model.db.session.query(model.Game.cover_id).all()
        # print(video_game_cover_ids)
        cover = crud.create_cover(id=id, url=url)
        model.db.session.add(cover)
    i += 500


### Seeding Platform db


### Seeding into game database of all the video games
i = 0
while i < 1000:

    data = f'fields id, name, platforms, storyline, genres, cover, first_release_date; limit 500; offset {i};'

    req = requests.post('https://api.igdb.com/v4/games', data=data, headers=payload)
    search_results = req.json()


    for game in search_results:
        id = game.get('id')
        name = game.get('name')
        description = game.get('storyline')
        cover_id = game.get('cover')
        release_date = game.get('first_release_date')

        if release_date:
            release_date = datetime.fromtimestamp(int(release_date))

        if name and id and cover_id and release_date and release_date.year >= 1995:
            if name and id and cover_id:
                id = int(id)
                cover_id = int(cover_id)

                game = crud.create_game(id=id,
                    name=name,
                        description=description,
                        cover_id=cover_id,
                        release_date=release_date)
                model.db.session.add(game)
    i += 500




model.db.session.commit()