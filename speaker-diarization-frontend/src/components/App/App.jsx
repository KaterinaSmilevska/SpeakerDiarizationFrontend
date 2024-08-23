import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const speakers = [
        { name: "Speaker 1", startTime: 5.0, endTime: 10.0, content: 'Speaker 1 content' },
        { name: "Speaker 2", startTime: 12.0, endTime: 15.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 20.0, endTime: 25.0, content: 'Speaker 3 content' },
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
                    marginLeft: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ flexGrow: 1, overflow: 'auto' }}>
                                        <Home speakers={speakers} currentTime={currentTime} />
                                    </div>
                                    <div style={{ flexShrink: 0 }}>
                                        <AudioPlayer onTimeUpdate={handleTimeUpdate} />
                                    </div>
                                </div>
                            }
                        />
                        <Route path="/export" />
                        <Route path="/documents" />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
