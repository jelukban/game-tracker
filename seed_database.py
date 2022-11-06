import os
import json
import requests
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system("dropdb game_tracker")
os.system('createdb game_tracker')

model.connect_to_db(server.app)
model.db.create_all()

API_ID = os.environ['CLIENT_ID']

API_SECRET = os.environ['CLIENT_SECRET']

url = f"https://id.twitch.tv/oauth2/token?client_id={API_ID}&client_secret={API_SECRET}&grant_type=client_credentials"
res= requests.post(url)
access_token = res.json()
access_token = access_token['access_token']

payload = {'Client-ID': API_ID,
'Authorization': f"Bearer {access_token}"}

data = 'fields name, platforms, storyline, genres, cover;'

req = requests.post('https://api.igdb.com/v4/games', data=data, headers=payload)
search_results = req.json()

all_games = []

for game in search_results:
    name = game.get('name')
    description = game.get('storyline')
    game_image = game.get('cover')

    game = crud.create_game(name=name, description=description, game_image=game_image)
    all_games.append(game)

model.db.session.add_all(all_games)
model.db.session.commit()
