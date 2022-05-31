import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const NavigationBar = () => {

    const {isAuthenticated, loginWithPopup, logout, user} = useAuth0();

    let sessionButtons = [];
    if(isAuthenticated){

        // TODO: pegarle a laravel con un fetch() y ver si el user esta en la BD de laravel o no. En caso de que no esté, redirigirlo con useNavigate a que complete el login.

        sessionButtons.push(<NavDropdown align={"end"} key="user-dropdown" title={user.nickname}>
                                <NavDropdown.Item key="2">View profile</NavDropdown.Item>
                                <NavDropdown.Item key="1" onClick={() => { logout({ returnTo: window.location.origin }) }}>Log out</NavDropdown.Item>
                            </NavDropdown>)

    } else{
        sessionButtons.push(<Nav.Link key="1" onClick={loginWithPopup}>Login</Nav.Link>);
    }

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