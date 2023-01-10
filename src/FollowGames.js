import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserReccomendations from './UserRecommendations.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';


function FollowGames () {

    const {followUserId} = useParams();
    const [followUser, setFollowUser] = useState({});
    const [followUserLoaded, setFollowUserLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/search/user/id', { method: 'POST',
        body: JSON.stringify({'id':followUserId}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.state !== 'Account not found') {
            setFollowUser(result);
            setFollowUserLoaded(true);
            }
        });
    }, []);


    if (followUserLoaded){
        return (<div className="user-profile">
            <h1> Welcome to {followUser.firstName}'s library!</h1>
            <UserInterests user={followUser} />
            <UserPlayedGames user={followUser} />
        </div>)
    };
};

export default FollowGames;