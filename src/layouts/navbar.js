import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

const NavigationBar = (props) => {

    props.updateUser("hola");

    // auth0
    
    const {isAuthenticated, loginWithPopup, logout, user, getAccessTokenSilently} = useAuth0();

    // Hooks

    const [sessionButtons, setSessionButtons] = useState(null);
    const navigate = useNavigate();

    // Login

    const buildLoginButtons = async () => {
        let loggedUser = null;
        if(isAuthenticated){
            await fetchUser();
            if(loggedUser == null){
                return;
            }
            setSessionButtons(<NavDropdown align={"end"} key="user-dropdown" title={loggedUser.user_name}>
                                    <NavDropdown.Item as={Link} to={`/users/${loggedUser.id}`} key="1">View profile</NavDropdown.Item>
                                    <NavDropdown.Item key="2" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</NavDropdown.Item>
                                </NavDropdown>)
    
        } else{
            setSessionButtons(<Nav.Link key="1" onClick={loginWithPopup}>Login</Nav.Link>);
        }

        async function fetchUser() {
            const token = await getAccessTokenSilently();
            let response = await fetch(process.env.REACT_APP_API_URL+"/user_logged", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if(response.status === 200){
                loggedUser = await response.json();
            } else{
                navigate(`/users/register`);
            }
        }
    }

    useEffect( () => {
        buildLoginButtons();
    }, [isAuthenticated]);

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