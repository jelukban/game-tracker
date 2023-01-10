import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Home () {

    const navigate = useNavigate();

    return (
        <div className="home-background">
            <h1 className="home-title">Welcome to your personalized video game library!</h1>
            <div className="container-for-home-button">
                <Button variant="secondary"
                        className="home-button"
                        onClick={(e) => navigate('/explore')}>
                            GET STARTED
                </Button>
            </div>
        </div>
    );
};

export default Home;