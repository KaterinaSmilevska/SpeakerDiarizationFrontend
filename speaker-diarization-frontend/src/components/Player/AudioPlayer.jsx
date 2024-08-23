import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { Pause, PlayArrow, Repeat, SkipNext, SkipPrevious, VolumeUp } from "@mui/icons-material";

const AudioPlayer = ({ onTimeUpdate }) => {
    const { pathname } = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [duration, setDuration] = useState(0); // State for the audio duration
    const [volume, setVolume] = useState(1); // State for the volume control
    const audioRef = useRef(null);

    useEffect(() => {
        if (pathname !== '/') return;

        const handleLoadedMetadata = () => {
            setDuration(audioRef.current.duration); // Set duration when metadata is loaded
        };

        const handleTimeUpdate = () => {
            const currentTime = audioRef.current.currentTime;
            setSliderValue(currentTime);
            onTimeUpdate(currentTime);
        };

        const audioElement = audioRef.current;
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata); // Event for duration
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [pathname, onTimeUpdate]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        audioRef.current.currentTime = newValue;
        onTimeUpdate(newValue);
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        audioRef.current.volume = newValue;
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
            <audio ref={audioRef} src="LE_listening_C1_A_job_interview.mp3" />

            {/* Volume Slider positioned in the top left corner with margins */}
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
