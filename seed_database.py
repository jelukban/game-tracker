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

#### Seeding into game database of all the video games
i = 0
while i < 150000:

    data = f'fields name, platforms, storyline, genres, cover, first_release_date; limit 500; offset {i};'

    req = requests.post('https://api.igdb.com/v4/games', data=data, headers=payload)
    search_results = req.json()


    for game in search_results:
        name = game.get('name')
        description = game.get('storyline')
        game_image = game.get('cover')
        release_date = game.get('first_release_date')

        if release_date:
            release_date = datetime.fromtimestamp(int(release_date)).strftime("%m-%d-%Y")

        if name:
            game = crud.create_game(name=name,
                    description=description,
                    game_image=game_image,
                    release_date=release_date)
            model.db.session.add(game)
    i += 500

model.db.session.commit()