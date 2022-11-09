import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillFileAdd, } from "react-icons/ai";
import { IoCloseSharp, IoMenuSharp } from 'react-icons/io5';
import { IoPersonCircle } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi"

import "./styles/Navbar.css";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [ActiveLink, setActiveLink] = useState('');
    const [ActiveNavbar, setActiveNavbar] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        setActiveLink(location.pathname.replace('/', ''));
    }, [location.pathname])

    return (
        <>
            <header className="navbar-header">
                <img className="navbar-header-logo" src='/logo-crm-white.png' alt="Logo CRM" />
                {!ActiveNavbar ? <IoMenuSharp onClick={() => setActiveNavbar(true)} /> : <IoCloseSharp onClick={() => setActiveNavbar(false)} />}
            </header>

            <aside className={ActiveNavbar ? 'navbar-container active' : 'navbar-container'}>
                <img src="logo-crm-white.png" alt="Logo CRM" className="navbar-logo" />
                <nav className="navbar-nav">
                    <Link className={ActiveLink == 'home' ? 'navbar-link active' : 'navbar-link'} to='/home'><AiFillHome />Página inicial</Link>
                    <Link className={ActiveLink == 'newcrm' ? 'navbar-link active' : 'navbar-link'} to='/newcrm'><AiFillFileAdd />Criar CRM</Link>
                    <Link className={ActiveLink == 'profile' ? 'navbar-link active' : 'navbar-link'} to='/profile'><IoPersonCircle />Perfil</Link>
                    {user && user.setor === 1 ?
                        <Link className={ActiveLink == 'itusers' ? 'navbar-link active' : 'navbar-link'} to='/itusers'><HiUserGroup />TI - Usuários</Link>
                        : null
                    }
                </nav>
            </aside>
        </>
    );
}

export default Navbar;