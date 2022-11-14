'use strict';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

function Homepage () {
    return (
        <div>
                <ul>
                <li><Link to="/login">Login</Link></li>
            </ul>
            <VideoGameContainer />
        </div>
    );
};

function LoginPage () {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

function Navbar () {
    pass;
};


function App() {
    return (
        <ReactRouterDOM.BrowserRouter>
            <React.Fragment>
                <ReactRouterDOM.Route exact path ='/'>
                    <Homepage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/login'>
                    <LoginPage />
                </ReactRouterDOM.Route>
            </React.Fragment>
        </ReactRouterDOM.BrowserRouter>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));