import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// componentes
import Home from './components/home.js';
import NavigationBar from './layouts/navbar.js';
import Games from './components/games.js';
import About from './components/about.js';
import Videos from './components/videos';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NavigationBar />}>
                        <Route index element={<Home />} />
                        <Route path='games' element={<Games />} />
                        <Route path='games/:game_name' element={<Videos />}/>
                        <Route path='about' element={<About />} />
                        <Route path='*' element={<Navigate replace to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
