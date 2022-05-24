import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../layouts/header";


const Videos = () => {

    const { game_name } = useParams();
    //const location = useLocation();

    // Hooks
    const [videos, setVideos] = useState([]);
    const [show, setShow] = useState(false);

    // Fetch
    const getDataFromAPI = async () => {
        //PREGUNTAR
        /*
        if(location.state == null){
            return;
        }
        const game_id = location.state.game_id;
        */
        const URL_videos = process.env.REACT_APP_API_URL + "/videos/game/" + game_name;
        let response = await fetch(URL_videos);
        const dataVideos = await response.json();
        dataVideos.sort((videoA, videoB) => videoA.completion_time_seconds - videoB.completion_time_seconds);
        setVideos(dataVideos)
    }

    useEffect(() => {
        getDataFromAPI();
    }, []);

    // Modal

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Columnas

    const columns = [
        {
            name: "id",
            selector: row => row.id
        },
        {
            name: "Users",
            selector: row => row.user_id
        },
        {
            name: "Game",
            selector: row => row.game_name
        },
        {
            name: "Category",
            selector: row => row.category_id
        },
        {
            name: "Time",
            selector: row => row.completion_time_seconds,
            cell: (video) => (
                SecondsToTime(video.completion_time_seconds)
            ),
        },
        {
            name: "Go to Video",
            cell: (video) => (
                <Link to={`/games/${game_name}/${video.id}`} ><Button variant="primary" size="sm">Watch</Button></Link>
            )
        }
    ]

    /*
    // PREGUNTAR
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
*/
    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    return (
        <div>
            <Header><h2 className="display-5">{game_name}</h2></Header>

            <div className="float-start mb-3">
                <Button variant="success" onClick={handleShow}>Submit Run</Button>
            </div>

            <div className="w-75">
                <DataTable
                    theme="dark"
                    columns={columns}
                    data={videos}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    dense
                    defaultSortFieldId={5}
                    // striped
                />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error: unauthorized</Modal.Title>
                </Modal.Header>
                <Modal.Body>You must be logged in for submitting a video.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function SecondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
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