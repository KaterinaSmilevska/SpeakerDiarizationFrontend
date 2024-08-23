import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const speakers = [
        { name: "Speaker 1", startTime: 0.0, endTime: 2.0, content: 'Speaker 1 content' },
        { name: "Speaker 2", startTime: 6.0, endTime: 9.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 10.0, endTime: 12.0, content: 'Speaker 3 content' },
        { name: "Speaker 2", startTime: 12.0, endTime: 21.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 22.0, endTime: 27.0, content: 'Speaker 3 content' },
        { name: "Speaker 2", startTime: 27.0, endTime: 37.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 37.0, endTime: 47.0, content: 'Speaker 3 content' },
        { name: "Speaker 2", startTime: 47.0, endTime: 50.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 50.0, endTime: 55.0, content: 'Speaker 3 content' },
        { name: "Speaker 2", startTime: 55.0, endTime: 60.0, content: 'Speaker 2 content' },
        { name: "Speaker 3", startTime: 60.0, endTime: 83.0, content: 'Speaker 3 content' },
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
