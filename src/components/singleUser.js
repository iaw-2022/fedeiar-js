import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";


const SingleUser = () => {

    const { user_id } = useParams();

     // Hooks
     const [user, setUser] = useState([]);

     // Fetch
     const getDataFromAPI = async() => {
        const URL = process.env.REACT_APP_API_URL+"/users/"+user_id;
        let response = await fetch(URL);
        const dataUser = await response.json();
        setUser(dataUser);
     }
 
     useEffect( () => {
         getDataFromAPI();
     }, []);


    return(
        <div>
            <Header className=""><h2 className="display-5 text-start">{user.user_name}'s profile</h2></Header>

            <Body>

                

                <hr></hr>

                <h1 className="display-6 text-start">Runs</h1>
            </Body>
        </div>
    );

}

export default SingleUser;