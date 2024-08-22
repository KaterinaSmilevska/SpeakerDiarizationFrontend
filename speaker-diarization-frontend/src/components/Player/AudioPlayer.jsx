import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {Box, IconButton, Slider} from "@mui/material";
import {Pause, PlayArrow, Repeat, SkipNext, SkipPrevious} from "@mui/icons-material";

const AudioPlayer = ({ onTimeUpdate }) => {
    const { pathname } = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (pathname !== '/') return;

        const handleTimeUpdate = () => {
            const currentTime = audioRef.current.currentTime;
            onTimeUpdate(currentTime);
        };

        const audioElement = audioRef.current;
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
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
                    value={audioRef.current?.currentTime || 0}
                    min={0}
                    max={audioRef.current?.duration || 0}
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
        </Box>
    );
};

export default AudioPlayer;
