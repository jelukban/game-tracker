import { React, useState, useEffect, Fragment} from 'react';
import { Link, BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount.js';
import Homepage from './Homepage.js';
import LoginPage from './LoginPage.js';
import Navbar from './Navbar.js';
import SignOut from './SignOut.js';
import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';
import VideoGameDetails from './VideoGameDetails.js';



function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState({id: "",
                                            firstName: "",
                                            lastName: "",
                                            email: "",
                                            password: "" });

    const [games, setGames] = useState([]);
    const [gameId, setGameId] = useState(0);
    const [searchName, setSearchName] = useState('');

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
            setUser({id: result.user_id,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    email: result.email,
                    password: result.password});
            setLoggedIn(true);
            };
        });
    };


    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create', { method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.has_account === 'True') {
            setUser({id: result.user_id,
                firstName: result.first_name,
                lastName: result.last_name,
                email: result.email,
                password: result.password});
            setLoggedIn(true);
            };
        });
    };


    const handleSignOut = (e) => {
        e.preventDefault();
        setLoggedIn(false);
        setUser({user_id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "" });
    };

    const setDefaultGames = () => {
        fetch('/api/games')
        .then((response) => response.json())
        .then((responseJson) => setGames(responseJson.games));
    };

    const handleSearchResults = (e) => {
        e.preventDefault();

        fetch('/api/search/name', { method: 'POST',
        body: JSON.stringify({searchName}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {
            setGames(result.games);
        });
    };


    return (
        <BrowserRouter>
            <Navbar loggedIn={loggedIn}
                    signOut={handleSignOut}
                    handleSearchResults={handleSearchResults}
                    setSearchName={(e) => setSearchName(e.target.value)}
                    setDefaultGames={setDefaultGames} />
            <Routes>
                <Route path ='/' element = {<Homepage games={games}/>} />
                <Route path='/login' element={loggedIn ? <Navigate to='/dashboard' />:
                                                                <LoginPage handleSubmit={handleLoginSubmit}
                                                                    setEmail={(e) => {setUser({ ...user, email: e.target.value })}}
                                                                    setPassword={(e) => {setUser({ ...user, password: e.target.value })}} />} />
                <Route path='/create' element ={loggedIn ? <Navigate to='/dashboard' /> :
                                                                <CreateAccount handleSubmit={handleCreateSubmit}
                                                                            setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
                                                                            setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
                                                                            setEmail={(e) => setUser({ ...user, email: e.target.value })}
                                                                            setPassword={(e) => setUser({ ...user, password: e.target.value })}/>} />
                <Route path='/dashboard' element={loggedIn ? <UserDashboard user={user} />:
                                                    <Navigate to='/' />} />

                <Route path='/dashboard/interests' element={<UserInterests user={user}/>} />
                <Route path='/dashboard/gamesplayed' element={<UserPlayedGames user={user}/>}/>
                <Route path={`/games/details/:game_id`} element ={<VideoGameDetails loggedIn={loggedIn}
                                                                                    user={user}/>}/>
                <Route path='/signout' element={loggedIn ? <Navigate to='/login' />:
                                                            <SignOut />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;