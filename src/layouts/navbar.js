import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

const NavigationBar = () => {

    // auth0

    const {isAuthenticated, loginWithPopup, logout, user, getAccessTokenSilently} = useAuth0();

    // Hooks

    const [sessionButtons, setSessionButtons] = useState(null);
    const navigate = useNavigate();

    // Login

    
   
    const buildLoginButtons = async () => {
        let loggedUser = null;
        console.log("entre1");
        if(isAuthenticated){
            console.log("entro?");
            await fetchUser();
            setSessionButtons(<NavDropdown align={"end"} key="user-dropdown" title={user.nickname}>
                                    <NavDropdown.Item as={Link} to={`/users/${loggedUser.id}`} key="1">View profile</NavDropdown.Item>
                                    <NavDropdown.Item key="2" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</NavDropdown.Item>
                                </NavDropdown>)
    
        } else{
            setSessionButtons(<Nav.Link key="1" onClick={loginWithPopup}>Login</Nav.Link>);
        }

        async function fetchUser() {
            const token = await getAccessTokenSilently();
            let response = await fetch(process.env.REACT_APP_API_URL+"/users/email/"+user.email, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log("entre3");
            if(response.status === 200){
                loggedUser = await response.json();
                console.log(loggedUser);
            } else{
                navigate(`/users/register`);
            }
            console.log("entre4");
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
                    <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
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