import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


const SingleUserProfile = () => {

    // Parameters

    const { user_id } = useParams();

    // auth0

    const { isAuthenticated } = useAuth0();

    // Hooks

    const [user, setUser] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

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
    
    // Wait for data
    
    if(!isLoaded){
        return(
            <h2 className="display-5">Loading...</h2>
        )
    }

    let updateDeleteButtons = null;
    if(isAuthenticated){ // TODO: y tambien si el video le pertenece (para eso tendriamos que saber si el user_id asociado al video corresponde al del usuario logueado)
        updateDeleteButtons = (
            <Stack direction="horizontal" gap={3}>
                <Link to={`/`}><Button variant="info">Edit profile</Button></Link>
                <Button variant="danger">Delete account</Button>
            </Stack>
        );
    }

    // View

    return(
        <div>
            <h3 className="text-start pb-2">Profile</h3>

            <p className="fs-5">username: {user.user_name}</p>
            <p className="fs-5">email: {user.email}</p>
            <p className="fs-5">from: {user.nationality}</p>
            <p className="fs-5">joined in: {new Date(user.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'})}</p>

            <hr></hr>

            {updateDeleteButtons}
        </div>
    );

}

export default SingleUserProfile