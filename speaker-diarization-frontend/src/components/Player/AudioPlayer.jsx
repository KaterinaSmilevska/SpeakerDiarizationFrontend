import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Slider, IconButton, Typography } from '@mui/material';
import { SkipPrevious, Pause, SkipNext, PlayArrow, Repeat } from '@mui/icons-material';

// Static Data: Simulating speaker data
const speakers = [
    { name: "Speaker 1", startTime: 5.0, endTime: 10.0 },
    { name: "Speaker 2", startTime: 12.0, endTime: 15.0 },
    { name: "Speaker 3", startTime: 20.0, endTime: 25.0 },
];

const AudioPlayer = () => {
    const { pathname } = useLocation();
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (pathname !== '/') return;

        const handleTimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        const audioElement = audioRef.current;
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [pathname]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (event, newValue) => {
        audioRef.current.currentTime = newValue;
        setCurrentTime(newValue);
    };

    if (pathname !== '/') return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '22vh',
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(180deg, rgba(77, 37, 174, 0.5) 0%, rgba(7, 209, 222, 0.5) 100%)',
                backdropFilter: 'blur(50px)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 1200,
                borderTop: '4px solid #10263C',
            }}
        >
            <audio ref={audioRef} src="path_to_your_audio_file.mp3" />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 1 }}>
                <IconButton color="inherit">
                    <Repeat />
                </IconButton>
                <IconButton color="inherit">
                    <SkipPrevious />
                </IconButton>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        border: '2px solid #ffffff',
                        background: 'rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <IconButton color="inherit" onClick={handlePlayPause}>
                        {isPlaying ? <Pause sx={{ fontSize: 36 }} /> : <PlayArrow sx={{ fontSize: 36 }} />}
                    </IconButton>
                </Box>
                <IconButton color="inherit">
                    <SkipNext />
                </IconButton>
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Slider
                    aria-label="Audio Playback"
                    value={currentTime}
                    min={0}
                    max={audioRef.current?.duration || 0}
                    onChange={handleSliderChange}
                    sx={{
                        width: '70%',
                        height: 12,
                        color: '#ffffff',
                        '& .MuiSlider-track': {
                            backgroundColor: '#97F3FF',
                        },
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#ffffff',
                            border: '2px solid #97F3FF',
                        },
                    }}
                />
            </Box>

            {/* Display Speaker Information */}
            <Box sx={{ width: '100%', padding: '0 16px', marginTop: 2 }}>
                {speakers.map((speaker, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="subtitle1">
                            {speaker.name}
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: 8,
                                backgroundColor: currentTime >= speaker.startTime && currentTime <= speaker.endTime ? "#07D1DE" : "#10263C",
                                borderRadius: 1,
                                marginLeft: 2,
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AudioPlayer;
