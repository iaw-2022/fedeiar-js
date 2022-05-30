import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider 
        domain="dev-w1hro3h2.us.auth0.com"
        clientId="xONvvvcLhHgZmh5E3GNUh8TTs5wkLq4X"
        redirectUri={window.location.origin}
        audience="https://speedrunVideos/api"
    >
        <App/>
    </Auth0Provider>
);