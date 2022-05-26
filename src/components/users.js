import { Button, Tab, Tabs } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../layouts/header";
import Body from "../layouts/body";


const Users = () => {

    // Hooks
    const [users, setUsers] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    // Fetch
    const getDataFromAPI = async () => {
        const URL = process.env.REACT_APP_API_URL+"/users";
        const response = await fetch(URL);
        const dataUsers = await response.json();
        setUsers(dataUsers);

        setLoaded(true);
    }

    useEffect(() => {
        getDataFromAPI();
    }, []);

    // Columnas

    const columns = [
        {
            name: "User",
            selector: row => row.user_name,
            cell: (user) => (
                <Link to={`/users/${user.id}`}>{user.user_name}</Link>
            )
        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Nationality",
            selector: row => row.nationality,
            hide: "sm",
            hide: "md"
        },
        {
            name: "Joined in",
            selector: row => new Date(row.created_at).toLocaleDateString({day: '2-digit', month: '2-digit', year: 'numeric'}),
            hide: "sm",
            hide: "md"
        },
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    if(!isLoaded){
        return(
            <Header><h2 className="display-5">Loading...</h2></Header>
        )
    }

    return (
        <div>
            <Header><h2 className="display-5">Users</h2></Header>

            <Body>

                <div className="">
                    <DataTable
                        theme="dark"
                        columns={columns}
                        data={users}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        dense
                        // striped
                    />
                </div>

            </Body>
            
        </div>
    )
}


export default Users;