import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../layouts/header";
import Body from "../layouts/body";
import { SecondsToTime } from "../utilities/util";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../layouts/loading";


const Videos = () => {

    const { isAuthenticated } = useAuth0();

    const { game_id } = useParams();
    let categoriesWithVideos = [];

    // Hooks
    
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

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

        setLoaded(true);
    }

    const buildCategoriesWithVideos = () => {
        for(let category of categories){
            let categoryWithVideos = {"category_id": category.id, "category_name": category.category_name, "videos": []};
            categoriesWithVideos.push(categoryWithVideos);
            for(let video of videos){
                if(video.category_name === categoryWithVideos.category_name){
                    categoryWithVideos.videos.push(video);
                    video.position = categoryWithVideos.videos.length;
                }
            }
        }
    }

    useEffect(() => {
        getDataFromAPI();
    }, []);

    // Modal

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Columnas

    const columns = [
        {
            name: "Ranking",
            selector: row => row.position,
        },
        {
            name: "User",
            selector: row => row.user_name,
            cell: (video) => (
                <Link to={`/users/${video.user_id}`}>{video.user_name}</Link>
            ),
        },
        {
            name: "Category",
            selector: row => row.category_name,
            hide: "md"
        },
        {
            name: "Completion Time",
            selector: row => row.completion_time_seconds,
            cell: (video) => (
                SecondsToTime(video.completion_time_seconds)
            ),
            hide: "md"
        },
        {
            name: "Date",
            selector: row => new Date(row.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'}),
            hide: "md"
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

    // Wait for data

    if(!isLoaded){
        return(
            <Loading></Loading>
        )
    }

    buildCategoriesWithVideos();

    let submitRunButton;
    if(!isAuthenticated){
        submitRunButton = <Button variant="success" onClick={handleShow}>Submit Run</Button>;
    } else{
        submitRunButton = <Link to={`/games/${game_id}/create`}><Button variant="success">Submit Run</Button></Link>;
    }

    // View
    
    return (
        <div>
            <Header><h2 className="display-5">{categories[0].game_name}</h2></Header>

            <Body>

                <div className="mb-3">
                    {submitRunButton}
                </div>

                <div className="">
                    <Tabs defaultActiveKey={categories[0].category_id}>
                        {categoriesWithVideos.map( (category) => (
                            <Tab key={category.category_id} eventKey={category.category_id} title={category.category_name}>
                                <div>
                                    <DataTable
                                        theme="dark"
                                        columns={columns}
                                        data={category.videos}
                                        pagination
                                        paginationComponentOptions={paginationComponentOptions}
                                        dense
                                        defaultSortFieldId={1}
                                        responsive
                                        // striped
                                    />
                                </div>
                            </Tab>
                        ))}
                    </Tabs>
                </div>

                <Modal show={showModal} onHide={handleClose}>
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

export default Videos;