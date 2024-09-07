import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioFile, setAudioFile] = useState(null);

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    const handlePlayPause = (playing) => {
        setIsPlaying(playing);
    };

    const handleFileUpload = (file) => {
        setAudioFile(file);
    }

    return (
        <Router>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Navigation onFileUpload={handleFileUpload} />
                <main style={{
                    flexGrow: 1,
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
                                        <Home currentTime={currentTime} isPlaying={isPlaying} fileName={audioFile? audioFile.name : 'No file uploaded'} selectedFile={audioFile}/>
                                    </div>
                                    <div style={{ flexShrink: 0 }}>
                                        <AudioPlayer onTimeUpdate={handleTimeUpdate} onPlayPause={handlePlayPause} audioFile={audioFile}/>
                                    </div>
                                </div>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;