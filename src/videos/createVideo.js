import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import { parseYoutubeURL, TimeToSeconds } from "../utilities/util";


const CreateVideo = () => {

    // auth0

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    // Parameters

    const { game_id } = useParams();

    // Hooks

    const [categorySelectedId, setCategorySelected] = useState('');
    const [youtubeURL, setYoutubeURL] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    
    const [categories, setCategories] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    // Modal

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Fetch

    const getDataFromAPI = async() => {
        const URLCategories = process.env.REACT_APP_API_URL+"/categories/"+game_id;
        const responseCategories = await fetch(URLCategories);
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);
        setCategorySelected(dataCategories[0].id);

        setLoaded(true);
    }

    useEffect(() => {
        getDataFromAPI();
    }, []);

    // Handle submit

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que se refresheen los campos después de dar submit.
        
        try{
            const youtube_id = parseYoutubeURL(youtubeURL);
            if (youtube_id == null){
                throw new Error();
            }
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtube_id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
            if(response.status != 200){
                throw new Error();
            }
            const dataResponse = await response.json();
            if(dataResponse.items.length == 0){
                throw new Error();
            }
        }catch(error){
            handleShow();
            return;
        }
        
        const video = {"game_id": game_id, "category_id": categorySelectedId, "link": youtubeURL, "time": TimeToSeconds(hours, minutes, seconds)};
        
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+"/videos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(video)
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

    // Wait for data.

    if(!isAuthenticated){
        return (
            <h1 className="display-4 text-center">Don't even try to bypass the logging.</h1>
        )
    }

    if(!isLoaded){
        return(
            <Header><h2 className="display-5">Loading...</h2></Header>
        )
    }

    // View

    return(
        <div>
            <Header><h1 className="display-4">Submit a new run for {categories[0].game_name}!</h1></Header>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Choose a category</Form.Label>
                    <Form.Select value={categorySelectedId} onChange={(e) => setCategorySelected(e.target.value)}>
                        { categories.map( (category) => (
                            <option key={category.id} value={category.id}>{category.category_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enter youtube link video</Form.Label>
                    <Form.Control required type="url" value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)} placeholder="youtube URL" />
                    <Form.Text className="text-white-50">
                        Important: it MUST be an URL ONLY from youtube, for example: https://www.youtube.com/watch?v=L4ZuuVG_QtM
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Completion time</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control required type="number" min="0" max="9999" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours"/>
                        </Col>
                        <Col>
                            <Form.Control required type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Minutes" />
                        </Col>
                        <Col>
                            <Form.Control required type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="Seconds" />
                        </Col>
                    </Row>
                </Form.Group>

                
                <hr></hr>

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/games/${game_id}`} className="btn btn-danger">Go back</Link>
                    <Button variant="primary" type="submit">Submit</Button>
                </Stack>

            </Form>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error: invalid youtube link</Modal.Title>
                </Modal.Header>
                <Modal.Body>Use a valid youtube URL for an existing video.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default CreateVideo;