import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
    return (
        <div className="App">
            {/* {sessionStorage.getItem('user') === null ? <Login /> : <><Navbar /> <main className='main-outlet'><Outlet/></main></>} */}
            <Navbar />
            <main className="main-outlet">
                <Outlet />
            </main>
        </div>
    )
}

export default App