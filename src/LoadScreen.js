import Spinner from 'react-bootstrap/Spinner';

function LoadScreen () {
    return (
      <div id="loading-spinner">
        <Spinner animation="border" role="secondary">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      );
}

export default LoadScreen;