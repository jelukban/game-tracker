import {React, useEffect, useState, Fragment} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Navbar ({loggedIn, signOut, handleSearchResults, setSearchName, setDefaultGames}) {
    let navigate = useNavigate();

    if (loggedIn) {
    return (
        <Fragment>
        <ul>
            <li><Link to='/' onClick={setDefaultGames}>Home</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
            <li><Link to="/dashboard/gamesplayed">Played</Link></li>
            <li><Link to="/dashboard/interests">Interests</Link></li>
            <li><Link to="/signout" onClick={signOut}>Sign Out</Link></li>
        </ul>
        <form id="search-bar" onSubmit={handleSearchResults}>
            <label> Search Bar</label>
            <input type="text" onChange={setSearchName}></input>
            <button onClick={(e) => navigate('/')}>Search</button>
        </form>
        </Fragment>
    );
    } else {
        return(
            <Fragment>
            <ul>
                <li><Link to='/' onClick={setDefaultGames}>Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/create">Create An Account</Link></li>
            </ul>
            <form id="search-bar" onSubmit={handleSearchResults}>
                    <label>Search Bar</label>
                    <input type="text" onChange={setSearchName}></input>
                    <button onClick={(e) => navigate('/')}>Search</button>
            </form>
            </Fragment>
        );
    };
};

export default Navbar;