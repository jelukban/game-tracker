import {React, useEffect, useState, Fragment} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Navbar ({loggedIn, signOut, handleSearchResults, setSearchName, setDefaultGames, user}) {
    let navigate = useNavigate();

    if (loggedIn) {
    return (
        <Fragment>
        <ul>
            <li><Link to='/' onClick={setDefaultGames}>Home</Link></li>
            <li><Link to={`/dashboard/${user.id}`}>User Dashboard</Link></li>
            <li><Link to={`/dashboard/${user.id}/gamesplayed`}>Played</Link></li>
            <li><Link to={`/dashboard/${user.id}/interests`}>Interests</Link></li>
            <li><Link to="/find" >Find People</Link></li>
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