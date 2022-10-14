import './App.css'
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { IoCloseSharp, IoMenuSharp } from 'react-icons/io5';
import Navbar from './components/Navbar';

function App() {
    const [Width, setWidth] = useState(window.innerWidth);
    const [ActiveNavbar, setActiveNavbar] = useState(false);
    const mobile = 768;

    window.addEventListener("resize", (e) => {
        setWidth(e.target.innerWidth);
        Width > mobile ? setActiveNavbar(true) : setActiveNavbar(false);
    });

    const handleNavbar = () => {
        ActiveNavbar ? setActiveNavbar(false) : setActiveNavbar(true);
    }

    return (
        <div className="App">
            {Width < mobile &&
                <header className='header-app'>
                    <img className='header-logo' src="logo-crm-white.png" alt="Logo CRM" />
                    {ActiveNavbar ? <IoCloseSharp onClick={handleNavbar} /> : <IoMenuSharp onClick={handleNavbar} />}
                </header>
            }

            {ActiveNavbar && <Navbar />}
            <main className="main-outlet">
                <Outlet />
            </main>
        </div>
    )
}

export default App