import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";


const Videos = () => {

    const { game_name } = useParams();
    const location = useLocation();
    const game_id = location.state.game_id;
    
    // Hooks
    const [videos, setVideos] = useState([]);

    // Fetch
    const URL_videos = process.env.REACT_APP_API_URL+"/videos/game/"+game_id;
    const getDataFromAPI = async() => {
        let response = await fetch(URL_videos);
        const dataVideos = await response.json();
        setVideos(dataVideos)
    }

    useEffect( () => {
        getDataFromAPI();
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
             <h1>Videos of {game_name}</h1>
        </div>
    )
}




/* class Videos extends React.Component{
    state = {
        game: null,
        videos: null,
        isLoaded: false
    }

    async componentDidMount() {
        let { game_id } = this.props.match.params.game_id;
        console.log("aa");
        console.log("valor: "+ game_id);
        let URL = process.env.REACT_APP_API_URL + "/games/"+game_id;
        let response = await fetch(URL);
        const resultGame = await response.json();
        
        URL = process.env.REACT_APP_API_URL + "/games/"+game_id;
        response = await fetch(URL);
        const resultVideos = await response.json();

        this.setState({
            games: resultGame,
            videos: resultVideos,
            isLoaded: true
        })
    }

    render(){
        const { game, videos, isLoaded } = this.state;
        if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        }
        console.log(game);

        return(<div>
            <Container>
                <h1>Videos</h1>
            </Container>

        </div>);
    }
} */

export default Videos;