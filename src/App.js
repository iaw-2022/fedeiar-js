import './App.css';
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
import UserRegisterFormulary from './users/userRegisterFormulary';

function App() {


    function updateUser(user) {
        console.log(user);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NavigationBar updateUser={updateUser} />}>
                        <Route index element={<Home />} />
                        <Route path='games' element={<Games />} />
                        <Route path='games/:game_id' element={<Videos />}/>
                        <Route path='games/:game_id/create' element={<CreateVideo />}/>
                        <Route path='games/:game_id/:video_id' element={<SingleVideo />}/>
                        <Route path='games/:game_id/:video_id/edit' element={<EditVideo />}/>
                        <Route path='users' element={<Users />}/>
                        <Route path='users/:user_id/' element={<SingleUser />}>
                            <Route index element={<SingleUserRuns />} />
                            <Route path='profile' element={<SingleUserProfile />} />
                        </Route>
                        <Route path='about' element={<About />} />
                        <Route path='*' element={<Navigate replace to="/" />} />
                    </Route>
                    <Route path='/users/register' element={<UserRegisterFormulary />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
