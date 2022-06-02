import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
        const URL = process.env.REACT_APP_API_URL+"/games";
        const response = await fetch(URL);
        const data = await response.json();
        setGames(data);

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

                <Row xs={1} sm={2} md={5} lg={8} className="g-4">
                    {searchedGames.map( (game, idx) => (
                        <Col key={game.id}>
                            <Card bg="dark" text="light">
                                <Card.Img variant="top" src="/joystick.png"/>
                                <Card.Body>
                                    <Card.Title className="text-start pb-2">{game.game_name}</Card.Title>
                                    <Link to={"/games/"+game.id}><Button variant="primary">Videos of {game.game_name}</Button></Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Body>
        </div>
        
    );
}

export default Games;