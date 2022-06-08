import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";
import Loading from "../layouts/loading";
import { parseYoutubeURL, SecondsToTime } from "../utilities/util";


const SingleVideo = (props) => {

    // Parameters

    const { game_id, video_id } = useParams();
    console.log("hola");
    // auth0

    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    // Hooks

    const [video, setVideo] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    // Fetch

    const getDataFromAPI = async() => {
        const URL_video = process.env.REACT_APP_API_URL+"/videos/"+video_id;
        let response = await fetch(URL_video);
        const dataVideo = await response.json();

        let youtube_id = parseYoutubeURL(dataVideo.link_video);
        dataVideo.link_video = "https://www.youtube.com/embed/"+youtube_id;

        setVideo(dataVideo);
        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Handle Delete

    const handleDelete = async () => {
        const token = await getAccessTokenSilently();
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+"/videos/"+video_id, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if(response.status === 204){
                navigate(`/games/${game_id}`);
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
            <Loading></Loading>
        )
    }
    

    let updateDeleteButtons = null;
    
    if(isAuthenticated && props.loggedUser != null && props.loggedUser.id == video.user_id){ // TODO: preguntar
        updateDeleteButtons = (
            <Stack direction="horizontal" gap={3}>
                <Link to={`/games/${game_id}/${video_id}/edit`}><Button variant="info">Edit video</Button></Link>
                <Button onClick={handleDelete} variant="danger">Delete video</Button>
            </Stack>
        );
    }

    // View

    return(
        <div>
            <Header><h2 className="display-5 text-start">{video.game_name}</h2></Header>

            <Body>
                <div className="mb-2">
                    <object
                        data={video.link_video}
                        frameBorder="0"
                        allowFullScreen   
                        width="640" 
                        height="360"
                    />
                </div>

                <div>
                   <p className="text-start">Run done by: <Link to={`/users/${video.user_id}`}>{video.user_name}</Link></p>
                    <p className="text-start">Category: {video.category_name}</p>
                    <p className="text-start">Done in: {SecondsToTime(video.completion_time_seconds)}</p>
                </div>

                {updateDeleteButtons}

                <hr></hr>

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/games/${game_id}`}><Button variant="primary">Go to videos of the game</Button></Link>
                    <Link to={`/users/${video.user_id}`}><Button variant="primary">Go to user's profile</Button></Link>
                </Stack>

                
            </Body>
        </div>
    );
}

export default SingleVideo;