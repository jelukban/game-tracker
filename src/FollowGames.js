import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FollowGames () {
    const { followUserId } = useParams();
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
            } else {
                alert('ID was not found');
            }
        });
    }, []);


    if (followUserLoaded){
        return (<div>
            <UserDashboard user={followUser} />
            <UserInterests user={followUser} />
            <UserPlayedGames user={followUser} />
        </div>)
    };
};

export default FollowGames;