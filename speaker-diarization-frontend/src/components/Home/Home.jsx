import React from "react";
import { Box, Typography } from "@mui/material";
import SpeakerWaveform from "../SpeakerWaveForm/SpeakerWaveForm";

const Home =  ({ speakers, currentTime }) => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0D0C1D, #0E1D2F, #0F1D30)',
                color: '#ffffff',
                padding: 3,
                overflow: 'auto',
            }}
        >
            <Typography variant="h4">Welcome Home</Typography>
            <SpeakerWaveform speakers={speakers} currentTime={currentTime} />
        </Box>
    );
};

export default Home;
