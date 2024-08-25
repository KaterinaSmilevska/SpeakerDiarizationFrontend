import React from "react";
import { Box, Typography } from "@mui/material";
import './SpeakerWaveForm.css';

const SpeakerWaveform = ({ speakers, currentTime, isPlaying }) => {
    if (!speakers || speakers.length === 0) {
        return <Typography variant="body1">No speakers available</Typography>;
    }

    const combinedSpeakers = speakers.reduce((acc, speaker) => {
        const existingSpeaker = acc.find((sp) => sp.name === speaker.name);
        if (existingSpeaker) {
            existingSpeaker.timeRanges.push([speaker.startTime, speaker.endTime]);
        } else {
            acc.push({ name: speaker.name, timeRanges: [[speaker.startTime, speaker.endTime]] });
        }
        return acc;
    }, []);

    return (
        <Box sx={{ mt: 3 }}>
            {combinedSpeakers.map((speaker, index) => {
                const isSpeaking = speaker.timeRanges.some(
                    ([start, end]) => currentTime >= start && currentTime <= end
                );

                return (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="subtitle1"
                            color={isSpeaking ? '#07D1DE' : "textSecondary"}
                            font-weight = {isSpeaking ? 'bold' : 'normal'}
                            sx={{ mr: 2 }}
                        >
                            {speaker.name}
                        </Typography>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', width: '90%', height: '50px' }}
                            className={isPlaying ? 'waveform-container' : ''}
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
