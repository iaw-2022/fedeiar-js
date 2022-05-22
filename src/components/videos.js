import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams, useLocation } from "react-router-dom";
import Header from "../layouts/header";


const Videos = () => {

    const { game_name } = useParams();
    const location = useLocation();

    // Hooks
    const [videos, setVideos] = useState([]);

    // Fetch
    const getDataFromAPI = async() => {
        if(location.state == null){
            return;
        }
        const game_id = location.state.game_id;
        const URL_videos = process.env.REACT_APP_API_URL+"/videos/game/"+game_id;
        let response = await fetch(URL_videos);
        console.log(response);
        const dataVideos = await response.json();
        setVideos(dataVideos)
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Columnas

    const columns = [
        {
            name: "Users",
            selector: row => row.user_id
        },
        {
            name: "Game",
            selector: row => row.game_id
        },
        {
            name: "Category",
            selector: row => row.category_id
        }
    ]

    if(location.state == null){
        return(<div>
            <h2>
                Error
            </h2>
            <p>
                Don't access the videos of a game by URL, use the table defined in the Games section.
            </p>
        </div>)
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    return(
        <div>
             <Header>Videos of {game_name}</Header>

             <DataTable
                theme="dark"
                columns={columns}
                data={videos}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                dense
                
                // striped
            />
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