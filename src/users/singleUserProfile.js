import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const SingleUserProfile = () => {

    const { user_id } = useParams();

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
    
    // View
    
    if(!isLoaded){
        return(
            <h2 className="display-5">Loading...</h2>
        )
    }

    return(
        <div>
            <h3 className="text-start pb-2">Profile</h3>

            <p className="fs-5">username: {user.user_name}</p>
            <p className="fs-5">email: {user.email}</p>
            <p className="fs-5">from: {user.nationality}</p>
            <p className="fs-5">joined in: {new Date(user.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
        </div>
    );

}

export default SingleUserProfile