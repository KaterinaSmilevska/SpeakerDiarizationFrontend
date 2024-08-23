import React from "react";
import { Box, Typography } from "@mui/material";
import SpeakerWaveform from "../SpeakerWaveForm/SpeakerWaveForm";

const Home =  ({ speakers, currentTime }) => {
    const currentSpeaker = speakers.find(
        speaker => currentTime >= speaker.startTime && currentTime <= speaker.endTime
    );

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0D0C1D, #0E1D2F, #0F1D30)',
                color: '#ffffff',
                padding: 3,
                overflow: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>Welcome Home</Typography>

            {currentSpeaker ? (
                <Box
                    sx={{
                        marginBottom: 3,
                        padding: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {currentSpeaker.name}:
                    </Typography>
                    <Typography variant="body1">
                        {currentSpeaker.content}
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    No speaker is currently speaking.
                </Typography>
            )}

            <SpeakerWaveform speakers={speakers} currentTime={currentTime} />
        </Box>
    );
};

export default Home;
