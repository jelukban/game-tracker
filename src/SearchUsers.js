import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';

function SearchUsers({followerUserInfo}){
    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(false);

    const handleSearchUser = (e) => {
        e.preventDefault();

        fetch('/api/search/user/email', { method: 'POST',
        body: JSON.stringify({'email':userEmail}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.status !== 'Account not found') {
                setUser({'id':result.id,
                        'firstName': result.firstName,
                        'lastName': result.lastName,
                        'email': result.email});
                setUserFound(true);
            } else {
                alert('Email was not found');
            }
        });
    };


    const handleFollow = (e) => {
        e.preventDefault();

        fetch('/api/search/user/follow', { method: 'POST',
        body: JSON.stringify({'followUserId':followerUserInfo.id,
                        'followingUserId':user.id}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.status === 'Follow was made!') {
                alert('Follow was made!')
            } else {
                alert('Already following this user.')
            };
        });
    };


    if (userFound) {
        return(
        <div> Search for a new user by email!
            <form onSubmit={handleSearchUser}>
                <input type="text"onChange={(e)=>setUserEmail(e.target.value)}/> Email
                <button>Search</button>
            </form>
            <button onClick={handleFollow}>Follow</button>
            <UserDashboard user={user} />
            <UserInterests user={user} />
            <UserPlayedGames user={user} />
        </div>
        );
    };


    if (!userFound) {
        return(
            <div> Search for a new user by email!
                <form onSubmit={handleSearchUser}>
                    <input type="text"onChange={(e)=>setUserEmail(e.target.value)}/> Email
                    <button>Search</button>
                </form>
            </div>
        )
    };

};

export default SearchUsers;