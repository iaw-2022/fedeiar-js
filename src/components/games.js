import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/header";
import Body from "../layouts/body";

const Games = () => {

    // Hooks
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch
    
    const getDataFromAPI = async() => {
        const URL = process.env.REACT_APP_API_URL+"/games";
        const response = await fetch(URL);
        const data = await response.json();
        setGames(data);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Search

    const searcher = (event) => {
        setSearch(event.target.value);
    }

    let searchedGames = !search ? games : games.filter( (game) => game.game_name.toLowerCase().includes(search.toLocaleLowerCase()) );

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


// SIN DATATABLE


/* const Games = () => {

    // Hooks
    
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch
    
    const getDataFromAPI = async() => {
        const URL = process.env.REACT_APP_API_URL+"/games";
        const response = await fetch(URL);
        const data = await response.json();
        setGames(data);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Columns

    const columns = [
        {
            name: <b className="display-5">All Available Games</b>,
            selector: row => row.game_name,
            cell: (game) => (
                <Link to={"/games/"+game.game_name} state={{ game_id: game.id }}><Button variant="success">{game.game_name}</Button></Link>
            ),
            center: true,
            
        }
    ]

    // Search

    const searcher = (event) => {
        setSearch(event.target.value);
    }

    let searchedGames = !search ? games : games.filter( (game) => game.game_name.toLowerCase().includes(search.toLocaleLowerCase()) );

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    // View

    return(
        <div>
            <Header>Games</Header>

            <input type="text" value={search} onChange={searcher} placeholder="Search for a game" className="form-control mb-4" />
            
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchedGames.map( (game) =>
                                <tr key={game.id}>
                                    <td><Link to={"/games/"+game.game_name} state={{ game_id: game.id }}> {game.game_name} </Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
        </div>
    );
} */




// CON CLASES










/* class Games extends React.Component {
    state = {
        games: null,
        isLoaded: false
    }

    async componentDidMount() {
        console.log("hola");
        const URL = process.env.REACT_APP_API_URL + "/games"
        const response = await fetch(URL);
        const result = await response.json();
        this.setState({
            games: result,
            isLoaded: true
        })
    }

    render() {
        const { games, isLoaded } = this.state;
        console.log("entre");
        if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        }

        const columns = [
            {
                name: "Game Name",
                selector: row => row.game_name
            }
        ]

        return (<div>
            
                <h1>Games</h1>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games.map( (game) =>
                                <tr key={game.id}>
                                    <td><Link to={"/games/"+game.game_name} state={{ game_id: game.id }}> {game.game_name} </Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            
        </div>);
    }
} */

export default Games;