import UserDashboard from './UserDashboard.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from 'react';

function FollowGames ({users}) {
    const navigate = useNavigate();

    return (<div> stuff
                {users.map(user => <React.Fragment>
                                        <UserDashboard user={user}/>
                                        <UserInterests user={user} />
                                        <UserPlayedGames user={user} />
                                    </React.Fragment>)}
            </div>);
};

export default FollowGames;