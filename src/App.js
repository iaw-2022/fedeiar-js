import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// componentes
import Home from './components/home';
import NavigationBar from './layouts/navbar';
import Games from './components/games';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NavigationBar />}>
                        <Route path='' element={<Home />} />
                        <Route path='games' element={<Games />} />
                        <Route path='*' element={<Navigate replace to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
