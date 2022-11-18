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


### Seeding into game database of all the video games
i = 0
while i < 400000:

    data = f'query games "Games" {{fields id, name, platforms.name, storyline, genres.name, cover.url, first_release_date; limit 1; offset {i};}};'
    # print(i)
    req = requests.post('https://api.igdb.com/v4/multiquery', data=data, headers=payload)
    search_results = req.json()

    # print(search_results)

    for game in search_results:
        if len(game.get('result')) != 0:
            id = game.get('result')[0].get('id')
            name = game.get('result')[0].get('name')
            description = game.get('result')[0].get('storyline')
            cover_url = game.get('result')[0].get('cover')

            if cover_url:
                cover_url = cover_url.get('url')

            release_date = game.get('result')[0].get('first_release_date')

            platforms = game.get('result')[0].get('platforms')

            print('-------------------------------------------------------------')
            print(id)
            print(name)
            print(description)
            print(cover_url)
            print(release_date)
            print(platforms)

            if release_date:
                release_date = datetime.fromtimestamp(int(release_date))

            if name and id:
                id = int(id)

                game = crud.create_game(id=id,
                    name=name,
                        description=description,
                        cover_url=cover_url,
                        release_date=release_date)
                model.db.session.add(game)
        else:
            continue
    i += 500


## Adding in test users
user = crud.create_user(fname='Jane',lname='Doe', email='test@tst.com',
                        password='aaa')

model.db.session.add(user)

model.db.session.commit()