import './App.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (sessionStorage.getItem('user') === null) {
            navigate('/')
        }
    }, [location.pathname])

    return (
        <div className="App">
            <Navbar />
            <main className="main-outlet">
                <Outlet />
            </main>
        </div>
    )
}

export default App