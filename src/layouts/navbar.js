import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

const NavigationBar = (props) => {

    // auth0
    
    const {isAuthenticated, loginWithPopup, logout, user, getAccessTokenSilently} = useAuth0();

    // Hooks

    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // Login

    const getUserFromAPI = async () => {
        const token = await getAccessTokenSilently();
        let response;
        try{
            response = await fetch(process.env.REACT_APP_API_URL+"/user_logged", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch(error){
            console.log(error);
            return;
        }

        if(response.status === 200){
            const dataUser = await response.json();
            props.updateUser(dataUser);

            setLoggedUser(dataUser);
            setLoaded(true);
        } else if(response.status === 404){
            navigate(`/users/register`);
        } else{
            const error = await response.json();
            console.log(error);
        }
    }

    useEffect( () => {
        if(isAuthenticated){
            getUserFromAPI();
        }
    }, [isAuthenticated]);

    // Wait for data

    let sessionButtons = null;

    if(isAuthenticated){
        if(!isLoaded){
            sessionButtons = <Nav.Link>Loading...</Nav.Link>
        } else{
            sessionButtons = (<NavDropdown align={"end"} key="user-dropdown" title={loggedUser.user_name}>
                                <NavDropdown.Item as={Link} to={`/users/${loggedUser.id}`} key="1">View profile</NavDropdown.Item>
                                <NavDropdown.Item key="2" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</NavDropdown.Item>
                            </NavDropdown>);
        }
    } else{
        sessionButtons = <Nav.Link key="1" onClick={loginWithPopup}>Login</Nav.Link>
    }

    // View

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Speedrun</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/games">Games</Nav.Link>
                            <Nav.Link as={Link} to="/users">Users</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                        <Nav>
                            {sessionButtons}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Container>
                    <Outlet></Outlet>
                </Container>
            </section>
        </div>
    );
}

export default NavigationBar;