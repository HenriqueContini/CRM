import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillFileAdd, } from "react-icons/ai";
import { IoCloseSharp, IoMenuSharp } from 'react-icons/io5';
import { IoPersonCircle } from "react-icons/io5";

import "./styles/Navbar.css";

const Navbar = () => {
    const [ActiveLink, setActiveLink] = useState('');
    const [ActiveNavbar, setActiveNavbar] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('user') === null) {
            navigate('/');
        }
        setActiveLink(location.pathname.replace('/', ''));
    }, [location.pathname.replace('/', '')])

    return (
        <>
            <header className="navbar-header">
                <img className="navbar-header-logo" src="/logo-crm-white.png" alt="Logo CRM" />
                {!ActiveNavbar ? <IoMenuSharp onClick={() => setActiveNavbar(true)} /> : <IoCloseSharp onClick={() => setActiveNavbar(false)} />}
            </header>

            <aside className={ActiveNavbar ? 'navbar-container active' : 'navbar-container'}>
                <img src="logo-crm-white.png" alt="Logo CRM" className="navbar-logo" />
                <nav className="navbar-nav">
                    <Link className={ActiveLink == 'home' ? 'navbar-link active' : 'navbar-link'} to='/home'><AiFillHome />Página inicial</Link>
                    <Link className={ActiveLink == 'newcrm' ? 'navbar-link active' : 'navbar-link'} to='/newcrm'><AiFillFileAdd />Criar CRM</Link>
                    <Link className={ActiveLink == 'profile' ? 'navbar-link active' : 'navbar-link'} to='/profile'><IoPersonCircle />Perfil</Link>
                </nav>
            </aside>
        </>
    );
}

export default Navbar;