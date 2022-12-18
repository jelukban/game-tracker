import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames';
import React from 'react';

function FollowGames ({user}) {

    return (<React.Fragment>
                <UserDashboard user={user}/>
                <UserInterests user={user} />
                <UserPlayedGames user={user} />
            </React.Fragment>
            );
};

export default FollowGames;