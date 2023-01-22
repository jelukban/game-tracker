# Game Tracker
The game tracker web app gives users access to a diverse library of video games by integrating access to the IGDB API which allows users to search over 250,000 unique video games and their video game information. Users can create an account, construct lists of games, follow other users, and rate video games. Once video games are marked as an interests, a user-specific engine recommends other video games of the same genre to the users. The goal of this project was to allow gamers to track video games, explore new games and connect to other gamers.

# Tech Stack and Languages
Python, JavaScript, Flask, React, PostGreSQL, SQLAlchemy, HTML and CSS

# Features
#### Account Creation and Login
<img width="1792" alt="Screenshot 2023-01-16 at 11 36 51 PM" src="https://user-images.githubusercontent.com/53098859/212837083-4a1198ee-b1ae-4d06-8d38-9c2363daed48.png">

#### Search Video Games and their Information
<img width="1792" alt="Screenshot 2023-01-16 at 11 37 52 PM" src="https://user-images.githubusercontent.com/53098859/212837326-5547f70f-fa60-4859-b1bc-f790dbf35673.png">

#### Rate Video Games
<img width="1792" alt="Screenshot 2023-01-16 at 11 38 20 PM" src="https://user-images.githubusercontent.com/53098859/212837414-856c6cb6-7142-4c60-8b8f-ff4514fe9153.png">

#### Mark Games as Previously Played or Interested
<img width="1792" alt="Screenshot 2023-01-16 at 11 38 49 PM" src="https://user-images.githubusercontent.com/53098859/212837512-410a23f5-802e-4ad8-968d-11fa4bafd60b.png">

#### Access Constructed Lists
<img width="1792" alt="Screenshot 2023-01-16 at 11 39 19 PM" src="https://user-images.githubusercontent.com/53098859/212837616-2b4fc2c1-4623-4180-b20d-953c3aec8539.png">
<img width="1792" alt="Screenshot 2023-01-16 at 11 39 38 PM" src="https://user-images.githubusercontent.com/53098859/212837679-ecd85a87-012c-4066-9934-425febc92d80.png">

#### Find Other Users and Follow Them
<img width="1792" alt="Screenshot 2023-01-16 at 11 40 16 PM" src="https://user-images.githubusercontent.com/53098859/212837797-20b3ea10-e7bc-4c0c-bfd8-a2e045d61742.png">

#### 20 Recommended Video Games
<img width="1792" alt="Screenshot 2023-01-16 at 11 40 38 PM" src="https://user-images.githubusercontent.com/53098859/212837857-3e30510b-00b9-40b9-b523-7f5fe922b4c9.png">


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
