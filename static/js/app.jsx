'use strict';

function Homepage() {
    return (
        <div>
            <div> Login Form
                <h1>Sign into your account</h1>
                <form id="login" method="POST">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email"></input>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id='password'></input>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div>
                <VideoGameContainer />
            </div>
        </div>
    );
};

ReactDOM.render(<Homepage />, document.querySelector('#root'));