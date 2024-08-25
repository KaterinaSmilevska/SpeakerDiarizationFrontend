import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const speakers = [
        { id: 1, name: "Speaker 1", startTime: 1.0, endTime: 10.0, content: 'Thanks for joining us on Mid-Morning this Thursday. It is almost time for the kids to start putting the backpacks on. They\'re going to have the homework.' },
        { id: 2, name: "Speaker 2", startTime: 10.0, endTime: 23.0, content: 'New study shows that students in those early elementary school years are actually getting too much homework.\n' +
                'In the worst case, researchers found children in the first grade had up to three times the workload recommended by education experts.' },
        { id: 2, name: "Speaker 2", startTime: 24.0, endTime: 40.0, content: 'As I said, we assure you this study was done by professionals not by children.\n' +
                'But it is interesting. They have this kind of 10 minute guideline where in kindergarten you\'re supposed to have no homework in first grade 10 minutes.\n' +
                'But Mike, the first graders in this survey, they were doing quite a bit of homework.'},
        { id: 3, name: "Speaker 3", startTime: 40.0, endTime: 51.0, content: '28 minutes, which I think is crazy. I can\'t think of a first grader having the attention span to do anything for 28 minutes.\n' +
                'And you made a good point. A lot of them are just kind of learning to read.'},
        { id: 4, name: "Speaker 4", startTime: 43.0, endTime: 44.0, content: 'That\'s a lot'},

    ];

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    const handlePlayPause = (playing) => {
        setIsPlaying(playing);
    };

    return (
        <Router>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Navigation />
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
                                        <Home speakers={speakers} currentTime={currentTime} isPlaying={isPlaying} />
                                    </div>
                                    <div style={{ flexShrink: 0 }}>
                                        <AudioPlayer onTimeUpdate={handleTimeUpdate} onPlayPause={handlePlayPause} />
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
