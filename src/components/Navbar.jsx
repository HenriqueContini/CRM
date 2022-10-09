import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiFillFileAdd, } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";

import "./Navbar.css";

const Navbar = () => {
    const [ActiveLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname.replace('/', ''));
    }, [location.pathname.replace('/', '')])

    return (
        <aside className="navbar-container">
            <img src="logo-crm-white.png" alt="Logo CRM" className="navbar-logo"/>
            <nav className="navbar-nav">
                <Link className={ActiveLink == 'home' ? 'navbar-link active' : 'navbar-link'} to='/home'><AiFillHome />Página inicial</Link>
                <Link className={ActiveLink == 'newcrm' ? 'navbar-link active' : 'navbar-link'} to='/newcrm'><AiFillFileAdd />Criar CRM</Link>
                <Link className={ActiveLink == 'profile' ? 'navbar-link active' : 'navbar-link'} to='/profile'><IoPersonCircle />Perfil</Link>
            </nav>
        </aside>
    );
}

export default Navbar;