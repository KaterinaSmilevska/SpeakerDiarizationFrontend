import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Navigation />
                <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/export" />
                        <Route path="/documents" />
                    </Routes>
                </main>
                <AudioPlayer />
            </div>
        </Router>
    );
};

export default App;
