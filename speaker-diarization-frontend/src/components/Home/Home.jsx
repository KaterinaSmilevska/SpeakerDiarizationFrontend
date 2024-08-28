import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SpeakerWaveform from "../SpeakerWaveForm/SpeakerWaveForm";

const Home = ({ speakers, currentTime, isPlaying, fileName }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentSpeaker, setCurrentSpeaker] = useState(null);

    useEffect(() => {

        const activeSpeakers = speakers.filter(
            speaker => currentTime >= speaker.startTime && currentTime <= speaker.endTime
        );

        if (activeSpeakers.length > 0) {
            const latestSpeaker = activeSpeakers[activeSpeakers.length - 1];
            const chunks = latestSpeaker.content.split(' ');
            const totalWords = chunks.length;
            const timeElapsed = currentTime - latestSpeaker.startTime;
            const totalDuration = latestSpeaker.endTime - latestSpeaker.startTime;
            const wordIndex = Math.floor((timeElapsed / totalDuration) * totalWords);

            setDisplayedText(chunks.slice(0, wordIndex + 1).join(' '));
            setCurrentSpeaker(latestSpeaker);
        } else {
            setDisplayedText("");
            setCurrentSpeaker(null);
        }
    }, [currentTime, speakers]);

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0D0C1D, #0E1D2F, #0F1D30)',
                color: '#ffffff',
                padding: 3,
                overflow: 'auto',
                height: '100%',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
        >

            {/* Display the file name if available */}
            {fileName && (
                <Typography variant="h6" gutterBottom sx={{ marginBottom: 3 }}>
                    Uploaded File: {fileName}
                </Typography>
            )}

            <SpeakerWaveform speakers={speakers} currentTime={currentTime} isPlaying={isPlaying} />

            {displayedText ? (
                <Box
                    sx={{
                        marginTop: 10,
                        padding: 2,
                        backgroundColor: 'linear-gradient(180deg, #0D0C1D, #0E1D2F, #0F1D30)',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                        borderLeft: '4px solid #07D1DE',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ color: '#07D1DE', fontWeight: 'bold' }}
                    >
                        {currentSpeaker?.name}:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic'}}>
                        {displayedText}
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ marginTop: 3 }}>
                    {/* Placeholder for when no text is displayed */}
                </Typography>
            )}

        </Box>
    );
};

export default Home;
