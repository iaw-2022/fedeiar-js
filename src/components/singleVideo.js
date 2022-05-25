import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Body from "../layouts/body";
import Header from "../layouts/header";


const SingleVideo = () => {

    const { game_id, video_id } = useParams();

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


    return(
        <div>
            <Header><h2 className="display-5">{video.game_name}</h2></Header>

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

                <hr></hr>

                <Link to={`/games/${game_id}`} className="float-start"><Button variant="danger">Go back</Button></Link>
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

function SecondsToTime(totalSeconds){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export default SingleVideo;