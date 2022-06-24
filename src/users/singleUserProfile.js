import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Stack, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


const SingleUserProfile = (props) => {

    // Parameters

    const { user_id } = useParams();

    // props

    let loggedUser = props.loggedUser;

    // auth0

    const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

    // Hooks

    const [user, setUser] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    
    const [showModal, setShowModal] = useState(false);

    // Modal

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Fetch

    const getDataFromAPI = async() => {
        const URL_user = process.env.REACT_APP_API_URL+"/users/"+user_id;
        let responseUser = await fetch(URL_user);
        const dataUser = await responseUser.json();
        setUser(dataUser);

        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Delete user

    const handleUserDelete = async () => {
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+`/users`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            
            if(response.status === 204){
                logout({ returnTo: window.location.origin })
                // navigate(`/`);
            } else{
                let error = await response.json();
                console.log(error);
            }
        } catch(error){
            console.log(error);
        }
    }
    
    // Wait for data
    
    if(!isLoaded){
        return(
            <h2 className="display-5">Loading...</h2>
        )
    }

    let updateDeleteButtons = null;
    if(isAuthenticated && loggedUser != null && loggedUser.id == user_id){
        updateDeleteButtons = (
            <Stack direction="horizontal" gap={3}>
                <Link to={`/users/profile/edit`}><Button variant="info">Edit profile</Button></Link>
                <Button variant="danger" onClick={handleShow}>Delete account</Button>
            </Stack>
        );
    }

    // View

    return(
        <div>

            <h3 className="text-start pb-2">Profile</h3>

            <p className="lead"><strong>Username: {user.user_name}</strong></p>
            <p className="lead"><strong>Email: {user.email}</strong></p>
            <p className="lead"><strong>From: {user.nationality}</strong></p>
            <p className="lead"><strong>Joined in: {new Date(user.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'})}</strong></p>

            <hr></hr>

            {updateDeleteButtons}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Danger zone: delete account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account? all your videos will be deleted.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleUserDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}

export default SingleUserProfile