import React from "react";
import { Box, Typography } from "@mui/material";

const SpeakerWaveform = ({ speakers, currentTime }) => {
    if (!speakers || speakers.length === 0) {
        return <Typography variant="body1">No speakers available</Typography>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            {speakers.map((speaker) => (
                <Box key={speaker.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                        {speaker.name}
                    </Typography>
                    <Box
                        sx={{
                            height: 20,
                            backgroundColor: currentTime >= speaker.startTime && currentTime <= speaker.endTime
                                ? "#07D1DE" : "#10263C",
                            borderRadius: 1,
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default SpeakerWaveform;
