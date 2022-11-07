'use strict';

function Homepage() {
    return (
        <div>
            <h1>Sign into your account</h1>
            <form id="login" method="POST">
                <label for="email">Email Address</label>
                <input type="text" id="email"></input>
                <label for="password"> Password</label>
                <input type="password"></input>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

ReactDOM.render(<Homepage />, document.querySelector('#root'));