import React from 'react';

function UserDashboard ({user}) {
    return (
        <React.Fragment>
            <h1>Welcome {user.firstName}!</h1>
                <p>User Id: {user.id}</p>
        </React.Fragment>
    );
};

export default UserDashboard;