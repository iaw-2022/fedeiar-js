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

                <Row xs={1} sm={2} md={5} lg={8} className="g-3">
                    {searchedGames.map( (game, idx) => (
                        <Col key={game.id}>
                            <Card className="card" bg="dark" text="light">
                                <Card.Img variant="top" src={"https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU"}/>
                                <Card.Body className="text-center d-flex flex-column">
                                    <Card.Title className="">{game.game_name}</Card.Title>
                                    <Link className="mt-auto" to={"/games/"+game.id} ><Button variant="primary">Videos</Button></Link>
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