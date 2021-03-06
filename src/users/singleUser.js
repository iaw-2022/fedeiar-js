import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";
import Loading from "../layouts/loading";


const SingleUser = () => {

    // Parameters

    const { user_id } = useParams();

    // Hooks

    const [user, setUser] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Fetch

    const getDataFromAPI = async() => {
        const URL_user = process.env.REACT_APP_API_URL+"/users/"+user_id;
        try{
            let responseUser = await fetch(URL_user);
            const dataUser = await responseUser.json();
            if(responseUser.status === 200){
                setUser(dataUser);
            }else{
                setError(true);
                console.log(dataUser);
            }
        } catch(error){
            console.log(error);
        }

        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Wait for data

    if(!isLoaded){
        return <Loading></Loading>
    }

    // View

    if(error){
        return(
            <div>
                <Header><h2>Error: user not found</h2></Header>
            </div>
        );
    }

    return(
        <div>
            <Header className=""><h1 className="display-4 text-start">{user.user_name}</h1></Header>

            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/users/${user_id}`} className="text-light">Runs</Nav.Link>
                        <Nav.Link as={Link} to={`/users/${user_id}/profile`} className="text-light">Profile</Nav.Link>
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