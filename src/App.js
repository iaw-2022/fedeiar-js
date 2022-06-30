import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// componentes
import Home from './home.js';
import NavigationBar from './layouts/navbar.js';
import Games from './games/games.js';
import About from './about.js';
import Videos from './videos/videos';
import SingleVideo from './videos/singleVideo';
import Users from './users/users';
import SingleUser from './users/singleUser';
import SingleUserRuns from './users/singleUserRuns';
import SingleUserProfile from './users/singleUserProfile';
import CreateVideo from './videos/createVideo';
import EditVideo from './videos/editVideo';
import CreateUser from './users/createUser';
import EditUser from './users/editUser.js'
import { useState } from 'react';

function App() {

    const [loggedUser, setLoggedUser] = useState(null);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NavigationBar updateUser={setLoggedUser} loggedUser={loggedUser} />}>
                        <Route index element={<Home />} />
                        <Route path='games' element={<Games />} />
                        <Route path='games/:game_id' element={<Videos />} />
                        <Route path='games/:game_id/create' element={<CreateVideo />} />
                        <Route path='games/:game_id/:video_id' element={<SingleVideo loggedUser={loggedUser} />} />
                        <Route path='games/:game_id/:video_id/edit' element={<EditVideo loggedUser={loggedUser} />} />
                        <Route path='users' element={<Users />} />
                        <Route path='users/:user_id/' element={<SingleUser />}>
                            <Route index element={<SingleUserRuns />} />
                            <Route path='profile' element={<SingleUserProfile loggedUser={loggedUser} />} />
                        </Route>
                        <Route path='users/profile/edit' element={<EditUser updateUser={setLoggedUser} loggedUser={loggedUser} />} />
                        <Route path='about' element={<About />} />
                        <Route path='*' element={<Navigate replace to="/" />} />
                    </Route>
                    <Route path='/users/register' element={<CreateUser />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
