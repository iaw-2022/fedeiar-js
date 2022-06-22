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

                <Row /* xs={1} sm={2} md={4} lg={8} */ className="g-3">
                    {searchedGames.map( (game) => (
                        <Col sm="auto"  md="auto" lg="auto" key={game.id}>
                            <Card className="card" bg="dark" text="light">
                                <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}/games/image/${game.id}`} width={200} height={150}/>
                                {/* <Card.Img variant="top" src={game.image} width={200} height={150}/> */}
                                <Card.Body className="text-center d-flex flex-column">
                                    <Card.Title className="">{game.game_name}</Card.Title>
                                    <Button as={Link} to={"/games/"+game.id} className="mt-auto" variant="primary">Videos</Button>
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