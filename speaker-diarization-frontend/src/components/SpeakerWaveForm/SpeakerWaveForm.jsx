import React from "react";
import { Box, Typography } from "@mui/material";

const SpeakerWaveform = ({ speakers, currentTime }) => {
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
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" color="primary">
                            {speaker.name}
                        </Typography>
                        <Box
                            sx={{
                                height: 20,
                                backgroundColor: isSpeaking ? "#07D1DE" : "#10263C",
                                borderRadius: 1,
                            }}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};

export default SpeakerWaveform;
