import React from "react";
import { Box, Typography } from "@mui/material";
import './SpeakerWaveForm.css';
import convertTimeToSeconds from "../../utils/timeUtils";

const SpeakerWaveform = ({ speakers, currentTime, isPlaying }) => {
    if (!speakers || speakers.length === 0) {
        return <Typography variant="body1">No speakers available</Typography>;
    }


    return (
        <Box sx={{ mt: 3 }}>
            {speakers.map((speaker, index) => {
                console.log(`Speaker ${speaker.speakerId}`, speaker.segments);

                const isSpeaking = isPlaying && speaker.segments.some(
                    segment => {
                        const segmentStart = convertTimeToSeconds(segment.startTime);
                        const segmentEnd = convertTimeToSeconds(segment.endTime);
                        return currentTime >= segmentStart && currentTime <= segmentEnd;
                    }
                );

                return (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="subtitle1"
                            color={isSpeaking ? '#07D1DE' : "textSecondary"}
                            fontWeight={isSpeaking ? 'bold' : 'normal'}
                            sx={{ mr: 2 }}
                        >
                            Speaker {speaker.speakerId}
                        </Typography>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', width: '90%', height: '50px' }}
                            className={isPlaying ? 'waveform-container' : 'waveform-container paused'}
                        >
                            {[...Array(40)].map((_, i) => (
                                <Box
                                    key={i}
                                    className={`pulse-bar ${!isSpeaking && 'inactive'}`}
                                    style={{ '--i': i }}
                                />
                            ))}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default SpeakerWaveform;
