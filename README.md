# Game Tracker

The game tracker web app gives users access to a diverse library of video games by integrating access to the IGDB API which allows users to search over 250,000 unique video games and their video game information. Users can create an account, construct lists of games, follow other users, and rate video games. Once video games are marked as an interests, a user-specific engine recommends other video games of the same genre to the users. The goal of this project was to allow gamers to track video games, explore new games and connect to other gamers.

# Tech Stack and Languages
Python, JavaScript, Flask, React, PostGreSQL, SQLAlchemy, HTML and CSS

# Features


# Prerequisites
A Client ID and Client Secret is needed to gain access to the Internet Game Database. To create an account, follow the directions in https://api-docs.igdb.com/#about.

Once an account is created, move on to set-up.

# Set-Up
## To seed in the IGDB API
Create a secrets.sh file containing:

```
export CLIENT_ID="your CLIENT ID"
export CLIENT_SECRET="your CLIENT SECRET"
export SECURE_LOCAL_STORAGE_HASH_KEY="create a hash key"
```



Start a virtual environment
```
virtualenv env
source env/bin/activate
```

Source your client ID and secret
```
source secrets.sh
```

Install requirements
```
cd backend/
pip3 install -r requirements.txt
```

Seed database
```
python3 seed_database.py
```

### Run Application
#### Open two terminals
Start a virtual environment (if you haven't done already) and install project dependencies
```
virtualenv env
source env/bin/activate
cd backend/
pip3 install -r requirements.txt
```

Go to web app root folder
```
cd ~/src/game-tracker
```

Start Flask server on one terminal
```
yarn start-server
```

Start react-app on the other terminal
```
yarn start
```