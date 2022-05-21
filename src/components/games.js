import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/* const Games = () => {

    // Hooks
    const [games, setGames] = useState([]);

    // Fetch
    const URL = process.env.REACT_APP_API_URL+"/games"
    const showData = async() => {
        const response = await fetch(URL);
        const data = await response.json();
        setGames(data);
    }

    useEffect( () => {
        showData();
    }, []);

    // Columnas

    const columns = [
        {
            name: "Game Name",
            selector: row => row.game_name
        }
    ]
    return(
        <div>
            <Container>
                <h1>Games</h1>
                <Table responsive striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games.map( (game) =>
                                <tr key={game.id}>
                                    <td><Link to={"/games/"+game.id}>{game.game_name}</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </div>;
    )
}
 */
class Games extends React.Component {
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
                                    <td><Link to={"/games/"+game.id} state={{ name: "hola" }}> {game.game_name} </Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            
        </div>);
    }
}

export default Games;