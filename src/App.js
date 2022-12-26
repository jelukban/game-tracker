import { React, useState, useEffect, Fragment } from 'react';
import { Link, BrowserRouter, Route, Navigate, Routes, redirect } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import CreateAccount from './CreateAccount.js';
import GamePage from './GamePage.js';
import LoginPage from './LoginPage.js';
import Navigationbar from './Navbar.js';
import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';
import VideoGameDetails from './VideoGameDetails.js';
import SearchUsers from './SearchUsers.js';
import Follows from './Follows.js';
import FollowGames from './FollowGames.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './SearchResults.js';
import Home from './Home.js';
import './App.css';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState(() => {
        const userInput = JSON.parse(secureLocalStorage.getItem('user'));
        if (userInput !== null) {
            setLoggedIn(true);
            return userInput
        } else {
            return '';
        };
    });

    const [games, setGames] = useState([]);
    const [gameId, setGameId] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [searchGames, setSearchGames] = useState([]);

    useEffect(() => {
        fetch('/api/games')
        .then((response) => response.json())
        .then((responseJson) => {
            setGames(responseJson.games);
         });
    }, []);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.json())
        .then((result) => {if (result.has_account === 'True') {
            let tempData = {'id': result.user_id,
                            'firstName': result.first_name,
                            'lastName': result.last_name,
                            'email': result.email,
                            'password': result.password};
            setUser(tempData);
            secureLocalStorage.setItem('user', JSON.stringify(tempData));
            setLoggedIn(true);
            } else if (result.status === 'Account not found') {
                alert('Account not found!');
            };
        });
    };


    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create/account', { method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.has_account === 'True') {
            let tempData = {'id': result.user_id,
                            'firstName': result.first_name,
                            'lastName': result.last_name,
                            'email': result.email,
                            'password': result.password};
            setUser(tempData);
            secureLocalStorage.setItem('user', JSON.stringify(tempData));
            setLoggedIn(true);
            } else if (result.status === 'Requirements not filled') {
                alert('Please enter a valid password!')
            } else if (result.status === 'Account with this email already exists') {
                alert('Account with this email already exists!')
            };
        });
    };


    const handleSignOut = (e) => {
        setUser({});
        secureLocalStorage.removeItem('user');
        setLoggedIn(false);
    };

    const handleSearchResults = (e) => {
        e.preventDefault();

        fetch('/api/search/name', { method: 'POST',
        body: JSON.stringify({searchName}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {
            setSearchGames(result.games);
        });
    };



    return (
        <BrowserRouter>
            <Navigationbar loggedIn={loggedIn}
                    signOut={handleSignOut}
                    handleSearchResults={handleSearchResults}
                    setSearchName={(e) => setSearchName(e.target.value)}
                    user={user} />
            <Routes>
                <Route path ='/' element = {<Home games={games}/>} />
                <Route path='/login' element={loggedIn ? <Navigate to={`/dashboard/${user.id}`} />:
                                                                <LoginPage handleSubmit={handleLoginSubmit}
                                                                    setEmail={(e) => {setUser({ ...user, email: e.target.value })}}
                                                                    setPassword={(e) => {setUser({ ...user, password: e.target.value })}} />} />
                <Route path='/create' element ={loggedIn ? <Navigate to={`/dashboard/${user.id}`} /> :
                                                                <CreateAccount handleSubmit={handleCreateSubmit}
                                                                            setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
                                                                            setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
                                                                            setEmail={(e) => setUser({ ...user, email: e.target.value })}
                                                                            setPassword={(e) => setUser({ ...user, password: e.target.value })}/>} />
                <Route path={`/dashboard/${user.id}`} element={ <UserDashboard user={user}/> } />
                <Route path={`/dashboard/${user.id}/interests`} element={<UserInterests user={user}/>} />
                <Route path={`/dashboard/${user.id}/gamesplayed`} element={<UserPlayedGames user={user}/>}/>
                <Route path={`/games/details/:game_id`} element ={<VideoGameDetails loggedIn={loggedIn}
                                                                                    user={user}/>}/>
                <Route path='/signout' element={<Navigate to='/' />} />
                <Route path='/find' element={<SearchUsers followerUserInfo={user}/>} />
                <Route path={`/dashboard/${user.id}/follows`} element={<Follows user={user}/>} />
                <Route path={`/dashboard/${user.id}/follows/:followUserId`} element={<FollowGames />} />
                <Route path='/search/results' element={<SearchResults games={searchGames} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;