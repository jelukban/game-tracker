import { React, useEffect, useParams, useState } from 'react';
import VideoGame from './VideoGame.js';
import Carousel from 'react-bootstrap/Carousel';


function UserRecommendations ({user}) {
    const [games, setGames] = useState([]);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };


    useEffect(() => {
        fetch(`/api/dashboard/${user.id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setGames(responseJson.games);
        });
    }, []);

    return (
        <div>
            <h1> Your recommendations </h1>
            <div className="recommended-games">
                <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
                    {games.map(game =>  <Carousel.Item>
                                            <VideoGame game_id={game.id}
                                                cover_url={game.cover_url}
                                                name={game.name}
                                                release_date={game.release_date}
                                                genres={game.genres.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')}
                                                platforms={game.platforms.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')}/>
                                        </Carousel.Item>
                                        )}
                </Carousel>
            </div>
        </div>
    );
};

export default UserRecommendations;