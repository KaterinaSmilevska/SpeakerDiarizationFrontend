import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AudioPlayer from "../Player/AudioPlayer";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const speakers = [
        { name: "Speaker 1", startTime: 0.0, endTime: 2.0, content: 'This recording is from the British Council' },
        { name: "Speaker 2", startTime: 6.0, endTime: 9.0, content: 'Hello Maria, thanks for coming in for the interview.' },
        { name: "Speaker 3", startTime: 10.0, endTime: 12.0, content: 'Its my pleasure. Thanks for inviting me.' },
        { name: "Speaker 2", startTime: 12.0, endTime: 21.0, content: 'Well, as you know, the company has been expanding\n' +
                                                                      'and we have an opening on our HR department. We\'re creating a new role for someone to lead our training and development within the company.'},
        { name: "Speaker 3", startTime: 22.0, endTime: 27.0, content: 'Yes. I very much think that my skills and experience\n' +
                                                                      'are a good fit for what you\'re looking for.\n' },
        { name: "Speaker 2", startTime: 27.0, endTime: 37.0, content: 'That sounds great. So your CV looks strong, though it would be good\n' +
                                                                      'if you could give us an overview in your own words of what you\'ve been doing over the past four years or so.' },
        { name: "Speaker 3", startTime: 37.0, endTime: 47.0, content: 'Well, in my first job four years ago, I was working for a small HR services provider\n' +
                                                                      'which offered HR services including LND to corporate clients.' },
        { name: "Speaker 2", startTime: 47.0, endTime: 50.0, content: 'Okay, so it was only B to B.\n' },
        { name: "Speaker 3", startTime: 50.0, endTime: 55.0, content: 'Yes, we only offered services to other companies, not B to C.\n' },
        { name: "Speaker 2", startTime: 55.0, endTime: 60.0, content: 'Right. And it says here you then left that company about three years ago.\n' },
        { name: "Speaker 3", startTime: 60.0, endTime: 83.0, content: 'Yes, that\'s right.\n' +
                'I was looking for a little more stability and also to be part of a larger organization.\n' +
                'So I joined a company with around 100 staff and a small HR team.\n' +
                'As there are only a few of us, we each deal with a range of HR topics.\n' +
                'In addition to payroll, one of the areas I was responsible for was learning and development.\n' },
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
