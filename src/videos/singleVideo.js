import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";
import { SecondsToTime } from "../utilities/util";


const SingleVideo = () => {

    const { game_id, video_id } = useParams();

    const { isAuthenticated } = useAuth0();

    // Hooks

    const [video, setVideo] = useState([]);

    // Fetch

    const getDataFromAPI = async() => {
        const URL_video = process.env.REACT_APP_API_URL+"/videos/"+video_id;
        let response = await fetch(URL_video);
        const dataVideo = await response.json();

        let youtube_id = parseYoutubeURL(dataVideo.link_video)
        dataVideo.link_video = "https://www.youtube.com/embed/"+youtube_id;

        setVideo(dataVideo);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Handle Delete

    //TODO: hacer el borrado

    // Wait for data

    let updateDeleteButtons = null;
    if(isAuthenticated){ // TODO: y tambien si el video le pertenece (para eso tendriamos que saber si el user_id asociado al video corresponde al del usuario logueado)
        updateDeleteButtons = (
            <Stack  direction="horizontal" gap={3}>
                <Button variant="info">Edit video</Button>
                <Button variant="danger">Delete video</Button>
            </Stack>
        );
    }

    // View

    return(
        <div>
            <Header><h2 className="display-5 text-start">{video.game_name}</h2></Header>

            <Body>
                <div>
                    <iframe
                        src={video.link_video}
                        frameBorder="0"
                        allowFullScreen   
                        width="640" 
                        height="360"
                    />
                </div>

                <div>
                    <p className="text-start">Run done by: {video.user_name}</p>
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

function parseYoutubeURL(URL){
    let video_id = URL.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}
export default SingleVideo;