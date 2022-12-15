import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';

function SearchUsers(){

    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(false);

    const handleSearchUser = (e) => {
        e.preventDefault();

        fetch('/api/search/user', { method: 'POST',
        body: JSON.stringify({'email':userEmail}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.state !== 'Account not found') {
                setUser({'id':result.user_id,
                        'firstName': result.first_name,
                        'lastName': result.last_name,
                        'email': result.email});
                setUserFound(true);
            } else {
                alert('Email was not found');
            }
        });
    };

    if (userFound) {
        return(
        <div> Search for a new user by email!
            <form onSubmit={handleSearchUser}>
                <input type="text"onChange={(e)=>setUserEmail(e.target.value)}/> Email
                <button>Search</button>
            </form>
            <UserDashboard user={user} />
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