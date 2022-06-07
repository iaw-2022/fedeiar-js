import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Form, Stack, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams, } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";


const EditUser = (props) => {

    // parameters

    const { user_id } = useParams();

    // props

    let loggedUser = props.loggedUser;
    console.log(loggedUser);

    // auth0

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    // Hooks

    const [username , setUsername] = useState("");
    const [nationality, setNationality] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const navigate = useNavigate();
    
    // Modal

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    // Fetch

    const loadUserData = async () => {
        if(loggedUser == null){
            return;
        }

        setUsername(loggedUser.user_name);
        setNationality(loggedUser.nationality);

        setLoaded(true);
    }

    useEffect( () => {
        loadUserData();
    }, [loggedUser]);

    // Edit user

    const handleUserEdit = async (e) => {
        e.preventDefault();

        const user = {user_name: username, nationality: nationality}
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+`/users`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            
            if(response.status === 204){
                window.location.replace(`/users/${user_id}/profile`);
                // navigate(`/users/${user_id}/profile`, { replace: true });
            } else if(response.status === 400){
                handleShow();
            } else{
                let error = await response.json();
                console.log(error);
            }
        } catch(error){
            console.log(error);
        }

    }

    // Wait for data

    if(!isAuthenticated){ // TODO: habría que ver además de que esté autenticado, que le corresponda el video?
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
            <Header><h1 className="display-4">Edit your profile's information!</h1></Header>

            <Body>
                   
                <Form onSubmit={handleUserEdit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Origin country</Form.Label>
                        <Form.Control required type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="country" />
                    </Form.Group>

                    <hr></hr>

                    <Stack direction="horizontal" gap={3}>
                        <Link to={`/users/${user_id}/profile`} className="btn btn-danger">Go back</Link>
                        <Button variant="primary" type="submit">Edit</Button>
                    </Stack>

                </Form>

            </Body>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error: name already in use</Modal.Title>
                </Modal.Header>
                <Modal.Body>Choose another username</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default EditUser;