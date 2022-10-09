import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
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