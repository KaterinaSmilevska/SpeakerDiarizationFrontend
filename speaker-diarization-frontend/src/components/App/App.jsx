import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const speakers = [
        { name: "Speaker 1", startTime: 5.0, endTime: 10.0 },
        { name: "Speaker 2", startTime: 12.0, endTime: 15.0 },
        { name: "Speaker 3", startTime: 20.0, endTime: 25.0 },
    ];

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    return (
        <Router>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Navigation />
                <main style={{
                    flexGrow: 1,
                    marginLeft: 300, // Adjust to match the width of the drawer when open
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden' // Hide any overflowing content
                }}>
                    <Routes>
                        <Route path="/" element={<Home speakers={speakers} currentTime={currentTime} />} />
                        <Route path="/export" />
                        <Route path="/documents" />
                    </Routes>
                </main>
                <AudioPlayer onTimeUpdate={handleTimeUpdate} />
            </div>
        </Router>
    );
};

export default App;

