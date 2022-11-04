import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system("dropdb game_tracker")
os.system('createdb game_tracker')

model.connect_to_db(server.app)
model.db.create_all()


model.db.session.add_all()
model.db.session.commit()


model.db.session.commit()