import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious, VolumeUp } from "@mui/icons-material";

const AudioPlayer = ({ onTimeUpdate, onPlayPause, audioFile }) => {
    const { pathname } = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    useEffect(() => {
        if (pathname !== '/') return;

        const audioElement = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleTimeUpdate = () => {
            const currentTime = audioElement.currentTime;
            setSliderValue(currentTime);
            onTimeUpdate(currentTime);
        };

        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [pathname, onTimeUpdate]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioFile) {
            const audioURL = URL.createObjectURL(audioFile);
            audioElement.src = audioURL;
            setIsPlaying(false);

            return () => {
                URL.revokeObjectURL(audioURL);
            };
        }
    }, [audioFile]);

    const handlePlayPause = () => {
        if(audioFile) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error("Error attempting to play audio:", error));
            }
            setIsPlaying(!isPlaying);
            onPlayPause(!isPlaying);
        }
       
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        audioRef.current.currentTime = newValue;
        onTimeUpdate(newValue);
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (audioRef.current) {
            audioRef.current.volume = newValue;
        }
    };

    const handleNextTrack = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = duration;
        }
    };

    const handlePreviousTrack = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
            <audio ref={audioRef} />

            <Box sx={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VolumeUp sx={{ color: '#ffffff' }} />
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    sx={{
                        width: 100,
                        color: '#ffffff',
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#ffffff',
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 1 }}>
                <IconButton color="inherit" onClick={handlePreviousTrack}>
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
                <IconButton color="inherit" onClick={handleNextTrack}>
                    <SkipNext />
                </IconButton>
            </Box>

            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Slider
                    aria-label="Audio Playback"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    min={0}
                    max={duration}
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
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    {formatTime(sliderValue)} / {formatTime(duration)}
                </Typography>
            </Box>
        </Box>
    );
};

export default AudioPlayer;
