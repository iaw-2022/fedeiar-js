import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/header";
import Body from "../layouts/body";
import Loading from "../layouts/loading";

const Games = () => {

    // Hooks

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoaded, setLoaded] = useState(false);

    // Fetch
    
    const getDataFromAPI = async() => {
        const URL_games = process.env.REACT_APP_API_URL+"/games";
        const response_games = await fetch(URL_games);
        const dataGames = await response_games.json();
        setGames(dataGames);

        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Search

    const searcher = (event) => {
        setSearch(event.target.value);
    }

    let searchedGames = !search ? games : games.filter( (game) => game.game_name.toLowerCase().includes(search.toLocaleLowerCase()) );

    // Wait for data

    if(!isLoaded){
        return(
            <Loading></Loading>
        )
    }

    // View

    return(
        <div>

            <Header><h1 className="display-3">Games</h1></Header>

            <Body>
            
                <input type="text" value={search} onChange={searcher} placeholder="Search for a game" className="form-control mb-4 w-25" />

                <Row className="g-4">
                    {searchedGames.map( (game) => (
                        <Col className="col-12 col-md-6 col-lg-4 col-xl-3" key={game.id}>
                            <div className="">
                                <img className="card-img" src={`${process.env.REACT_APP_API_URL}${game.image_URL}`}/>
                                <div className="mb-1 pt-1 text-center flex-column">
                                    <Card.Title className="">{game.game_name}</Card.Title>
                                    <Button as={Link} to={"/games/"+game.id} className="mt-auto" size="sm" variant="primary">Videos</Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                
            </Body>

        </div>
    );
}

export default Games;