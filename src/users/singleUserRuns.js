import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { SecondsToTime } from "../utilities/util";


const SingleUserRuns = () => {

    // Parameters

    const { user_id } = useParams();

    // Hooks

    const [userVideos, setUserVideos] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    
    // Fetch

    const getDataFromAPI = async() => {
        const URL_userVideos = process.env.REACT_APP_API_URL+"/videos/user/"+user_id;
        let responseUserVideos = await fetch(URL_userVideos);
        const dataUserVideos = await responseUserVideos.json();
        setUserVideos(dataUserVideos);

        setLoaded(true);
    }

    useEffect( () => {
        getDataFromAPI();
    }, []);

    // Datatable

    const columns = [
        {
            name: "Game",
            selector: row => row.game_name,
        },
        {
            name: "Category",
            selector: row => row.category_name,
            hide: "md"
        },
        {
            name: "Completion Time",
            selector: row => row.completion_time_seconds,
            cell: (video) => (
                SecondsToTime(video.completion_time_seconds)
            ),
            hide: "md"
        },
        {
            name: "Date",
            selector: row => new Date(row.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'}),
            hide: "md"
        },
        {
            name: "Go to Video",
            cell: (userVideo) => (
                <Link to={`/games/${userVideo.game_id}/${userVideo.id}`} ><Button variant="primary" size="sm">Watch</Button></Link>
            )
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    // Wait for data

    if(!isLoaded){
        return(
            <h2 className="display-5">Loading...</h2>
        )
    }

    // View

    return(
        <div>
            <h2 className="display-6 text-start mb-3"><strong>Runs</strong></h2>

            <DataTable
                theme="dark"
                columns={columns}
                data={userVideos}
                pagination={userVideos.length > 10}
                paginationComponentOptions={paginationComponentOptions}
                defaultSortFieldId={1}
                responsive
            />
        </div>
    );

}

export default SingleUserRuns