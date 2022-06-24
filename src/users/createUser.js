import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/header";

const CreateUser = () => {

    // auth0

    const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

    // Hooks

    const [username , setUsername] = useState("");
    const [nationality, setNationality] = useState("");
    
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Modal

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Create user

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const user = {user_name: username, nationality: nationality}
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+"/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            
            if(response.status === 204){
                navigate(`/`);
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

    if(!isAuthenticated){
        return (
            <div>
                <section>
                    <Container>
                        <Header><h1 className="display-5">You must be authenticated to complete the signup.</h1></Header>
                        <Link to="/"><Button variant="danger">Go to Home Page.</Button></Link>
                    </Container>
                </section>
            </div>
        );
    }

    // View

    return (
        <div>
            <section>

                <Container>
                    <Header><h1 className="display-3">Complete registration!</h1></Header>

                    <Form onSubmit={handleUserSubmit}>

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
                            <Button variant="primary" type="submit">Register</Button>
                            <Button variant="danger" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</Button>
                        </Stack>

                    </Form>
                </Container>

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

            </section>
        </div>
    );
}

export default CreateUser;