import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/header";

const UserRegisterFormulary = () => {

    // auth0

    const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

    // Hooks

    const [username , setUsername] = useState("");
    const [nationality, setNationality] = useState("");
    const [isLoaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // Create user

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const user = {user_name: username, nationality: nationality}
        const token = await getAccessTokenSilently();
        console.log(token);
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
                console.log("entre?");
                navigate(`/`);
            } else{
                let error = await response.json();
                console.log(error);
            }
        } catch(error){
            console.log(error);
        }
    }
    

    if (!isAuthenticated) {
        return (
            <div>
                <section>
                    <Container>
                        <Header><h1 className="display-5">You must be authenticated to complete the signup.</h1></Header>

                        <Link to="/"><Button variant="danger">Go to Home Page.</Button></Link>
                    </Container>
                </section>
            </div>
        )
    }

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
                            {/* <Link  to={`/games/${game_id}`} className="btn btn-danger">Go back</Link> */}
                            <Button variant="primary" type="submit">Register</Button>
                            <Button variant="danger" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</Button>
                        </Stack>

                    </Form>

                </Container>
            </section>
        </div>
    );
}

export default UserRegisterFormulary;