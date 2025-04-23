import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound.tsx';
import Footer from './components/footer/Footer';
import Genres from './components/genre/Genres.tsx';
import Navbar from './components/navbar/Navbar';
import Composers from "./components/composer/Composers.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Tracks from "./components/track/Tracks";
import Playlists from "./components/playlist/Playlists.tsx";
import Albums from "./components/album/Albums.tsx";
import TrackList from "./components/track/TrackList.tsx";
import {getTracksFromAlbum} from "./api/albums/albumApi.ts";
import {getTracksFromPlaylist} from "./api/playlists/playlistApi.ts";

const queryClient = new QueryClient();

function App() {
    return (
        <Router>
            <div className="app-container">
                <QueryClientProvider client={queryClient} >
                <Navbar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/albums" element={<Albums />}/>
                        <Route path="/albums/:id" element={<TrackList tracksFunc={getTracksFromAlbum}/>}/>
                        <Route path="/composers" element={<Composers />}/>
                        <Route path="/playlists" element={<Playlists />}/>
                        <Route path="/playlists/:id" element={<TrackList tracksFunc={getTracksFromPlaylist}/>}/>
                        <Route path="/tracks" element={<Tracks />}/>
                        <Route path="/genres" element={<Genres />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
                </QueryClientProvider>
            </div>
        </Router>
    );
}

export default App;