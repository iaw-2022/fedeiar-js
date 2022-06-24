import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Stack, Modal, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";
import Loading from "../layouts/loading";
import { parseYoutubeURL, SecondsToTime } from "../utilities/util";


const SingleVideo = (props) => {

    // Parameters

    const { game_id, video_id } = useParams();
    
    // auth0

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    // Hooks

    const [video, setVideo] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    // Modal

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    // Fetch

    const getDataFromAPI = async() => {
        const URL_video = process.env.REACT_APP_API_URL+"/videos/"+video_id;
        let response = await fetch(URL_video);
        const dataVideo = await response.json();

        let youtube_id = parseYoutubeURL(dataVideo.link_video);
        dataVideo.link_video = "https://www.youtube.com/embed/"+youtube_id;

        setVideo(dataVideo);
        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Handle Delete

    const handleVideoDelete = async () => {
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+"/videos/"+video_id, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if(response.status === 204){
                navigate(`/games/${game_id}`);
            } else{
                let error = await response.json();
                console.log(error);
            }
        } catch(error){
            console.log(error);
        }
    }

    // Wait for data
    
    if(!isLoaded){
        return(
            <Loading></Loading>
        )
    }
    
    let updateDeleteButtons = null;
    
    if(isAuthenticated && props.loggedUser != null && props.loggedUser.id == video.user_id){
        updateDeleteButtons = (
            <Stack direction="horizontal" gap={3}>
                <Link to={`/games/${game_id}/${video_id}/edit`}><Button variant="info">Edit video</Button></Link>
                <Button onClick={handleShowModal} variant="danger">Delete video</Button>
            </Stack>
        );
    }

    // View

    return(
        <div>

            <Header><h2 className="display-5 text-start">{video.game_name}</h2></Header>

            <Body>
                
                <div className="mb-2">
                    <object
                        data={video.link_video}
                        frameBorder="0"
                        allowFullScreen
                        width="640"
                        height="360"
                    />
                </div>
                
                <div>
                   <p className="text-start fs-5">Run done by: <strong><Link to={`/users/${video.user_id}`}>{video.user_name}</Link></strong></p>
                    <p className="text-start fs-5">Category: <strong>{video.category_name}</strong></p>
                    <p className="text-start fs-5">Done in: <strong>{SecondsToTime(video.completion_time_seconds)}</strong></p>
                </div>

                {updateDeleteButtons}

                <hr></hr>

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/games/${game_id}`}><Button variant="primary">Videos of the game</Button></Link>
                    <Link to={`/users/${video.user_id}`}><Button variant="primary">User's profile</Button></Link>
                </Stack>

            </Body>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Danger zone: delete speedrun</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the speedrun?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleVideoDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default SingleVideo;