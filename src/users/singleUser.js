import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";


const SingleUser = () => {

    const { user_id } = useParams();

    // Hooks
    const [user, setUser] = useState([]);

    // Fetch
    const getDataFromAPI = async() => {
        const URL_user = process.env.REACT_APP_API_URL+"/users/"+user_id;
        let responseUser = await fetch(URL_user);
        const dataUser = await responseUser.json();
        setUser(dataUser);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);


    return(
        <div>
            <Header className=""><h2 className="display-5 text-start">{user.user_name}</h2></Header>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/users/${user_id}`}>Runs</Nav.Link>
                        <Nav.Link as={Link} to={`/users/${user_id}/profile`}>Profile</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <hr></hr>
            
            
            <Outlet></Outlet>
            
        </div>
    );

}

export default SingleUser;