import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Home from './pages/Home';
import Newcrm from './pages/Newcrm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Crm from './pages/Crm';
import Editcrm from './pages/Editcrm';
import ITUsers from './pages/ITUsers';

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
                    <Route path='/crm/:id' element={<Crm />} />
                    <Route path='/editcrm/:id' element={<Editcrm />} />
                    <Route path='/itusers' element={<ITUsers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)