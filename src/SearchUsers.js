import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchUsers(){
    let navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState({});

    const handleSearchUser = (e) => {
        e.preventDefault();


        fetch('/api/search/user', { method: 'POST',
        body: JSON.stringify({'email':userEmail}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.state !== 'Account not found') {
            console.log(result.user_id);
            setUser(result);
            navigate(`/dashboard/${result.user_id}`);
        } else {
            alert('Email was not found')
        }
        });
    };

    if (user.state !== 'Account found!') {
    return(
        <div> Search for a new user by email!
            <form onSubmit={handleSearchUser}>
                <input type="text"onChange={(e)=>setUserEmail(e.target.value)}/> Email
                <button>Search</button>
            </form>
        </div>
    );
    }
};

export default SearchUsers;