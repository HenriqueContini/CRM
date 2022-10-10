import { useState } from 'react';
import UserCRM from '../components/UserCRM';
import './Home.css';

const Home = () => {
    const [content, setContent] = useState('userCRM');

    return (
        <section className="home-container">
            <nav className="home-nav">
                <button className={content === 'userCRM' ? 'home-nav-button active' : 'home-nav-button'} onClick={() => setContent('userCRM')}>Minhas CRMs</button>
                <button className={content === 'awareCRM' ? 'home-nav-button active' : 'home-nav-button'} onClick={() => setContent('awareCRM')}>Ciência das CRMs</button>
                <button className={content === 'searchCRM' ? 'home-nav-button active' : 'home-nav-button'} onClick={() => setContent('searchCRM')}>Buscar CRM</button>
            </nav>

            {content === 'userCRM' && <UserCRM />}
        </section>
    );
}

export default Home;