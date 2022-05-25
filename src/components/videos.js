import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../layouts/header";
import Body from "../layouts/body";


const Videos = () => {

    const { game_id } = useParams();

    // Hooks
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);

    // Fetch
    const getDataFromAPI = async () => {
        const URL_categories = process.env.REACT_APP_API_URL+"/categories/"+ game_id;
        const responseCategories = await fetch(URL_categories);
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);

        const URL_videos = process.env.REACT_APP_API_URL+"/videos/game/"+ game_id;
        const responseVideos = await fetch(URL_videos);
        let dataVideos = await responseVideos.json();
        dataVideos.sort((videoA, videoB) => videoA.completion_time_seconds - videoB.completion_time_seconds);
        setVideos(dataVideos);
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
            name: "User",
            selector: row => row.user_name
        },
        {
            name: "Category",
            selector: row => row.category_name
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
                <Link to={`/games/${game_id}/${video.id}`} ><Button variant="primary" size="sm">Watch</Button></Link>
            )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    if(categories.length == 0){
        return(
            <Header><h2 className="display-5">Loading...</h2></Header>
        )
    }

    return (
        <div>
            <Header><h2 className="display-5">{categories[0].game_name}</h2></Header>

            <Body>

                <div className="mb-3 text-start">
                    <Button variant="success" onClick={handleShow}>Submit Run</Button>
                </div>

              

                <div className="">
                    <Tabs defaultActiveKey={categories[0].category_id}>
                        {categories.map( (category) => (
                            <Tab key={category.id} eventKey={category.id} title={category.category_name}>
                                <div>
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
                            </Tab>
                        ))}
                    </Tabs>
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

            </Body>
            
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