import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound.tsx';
import Footer from './components/footer/Footer';
import GenresComponent from './components/genre/GenresComponent';
import Navbar from './components/navbar/Navbar';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/albums" />
                        <Route path="/album/:id" />
                        <Route path="/composers" />
                        <Route path="/composer/:id" />
                        <Route path="/playlists" />
                        <Route path="/playlist/:id" />
                        <Route path="/tracks" />
                        <Route path="/track/:id" />
                        <Route path="/genres" element={<GenresComponent />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;