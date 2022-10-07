import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Home from './pages/Home';
import Newcrm from './pages/Newcrm';
import Profile from './pages/Profile';
import Login from './pages/Login';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route element={<App />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/newcrm' element={<Newcrm />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
