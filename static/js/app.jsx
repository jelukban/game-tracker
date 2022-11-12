'use strict';

function Homepage () {
    return (
        <div>
            <div>
                <VideoGameContainer />
            </div>
        </div>
    );
};

function LoginPage () {
    return (
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
    );
};

function Navbar () {
    pass;
};

function MainContent () {
    const [currentPage, setCurrentPage] = React.useState('');

    function renderContent () {
        if (currentPage === 'homepage') {
            return <Homepage></Homepage>
        }
        if (currentPage === 'login') {
            return <LoginPage></LoginPage>
        };
    };

    return (
        <div>
            <button onClick={() => setCurrentPage('homepage')}>Homepage</button>
            <button onClick={() => setCurrentPage('login')}>Login</button>
            {renderContent()}
        </div>
        );
};

function SideContent () {
    pass;
};

function App() {
    return (
        <div>
            <MainContent />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));