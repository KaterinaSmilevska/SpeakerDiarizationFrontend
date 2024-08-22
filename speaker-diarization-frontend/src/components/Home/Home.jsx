import React from "react";
import { Box, Typography } from "@mui/material";
import AudioPlayer from "../Player/AudioPlayer";

// Static Data: Simulating JSON response from backend
const speakers = [
    { name: "Speaker 1", startTime: 5.0, endTime: 10.0 },
    { name: "Speaker 2", startTime: 12.0, endTime: 15.0 },
    { name: "Speaker 3", startTime: 20.0, endTime: 25.0 },
];

const Home = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0D0C1D, #0E1D2F, #0F1D30)',
                color: '#ffffff',
                padding: 3,
                overflow: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to Home
            </Typography>

            <AudioPlayer
                audioSrc="path_to_your_audio_file.mp3"
                speakers={speakers}
            />
        </Box>
    );
};

export default Home;
