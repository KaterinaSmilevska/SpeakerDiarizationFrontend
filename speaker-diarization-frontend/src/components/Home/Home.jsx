import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SpeakerWaveform from "../SpeakerWaveForm/SpeakerWaveForm";
import axios from "../../axios";
import convertTimeToSeconds from "../../utils/timeUtils";

const Home = ({ currentTime, isPlaying, fileName, selectedFile, onExport }) => {
    const [speakers, setSpeakers] = useState([]);
    const [displayedText, setDisplayedText] = useState("");
    const [currentSpeaker, setCurrentSpeaker] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSpeakers = async () => {
            setLoading(true);
            try {
                if (fileName && selectedFile) {
                    const formData = new FormData();
                    formData.append("audioFile", selectedFile);

                    setSpeakers([]);
                    setDisplayedText("");
                    setCurrentSpeaker(null);

                    const response = await axios.post(`/speakers/${fileName}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    console.log("Speaker data:", response.data);
                    setSpeakers(response.data.speakers);
                    onExport(response.data.speakers);
                }
            } catch (error) {
                console.error("Error fetching speaker data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers().catch(error => {
            console.error("Unhandled error:", error);
        });
    }, [fileName, selectedFile]);

    useEffect(() => {
        if (isPlaying) {
            const activeSegments = speakers.flatMap(speaker =>
                speaker.segments
                    .filter(segment =>
                        currentTime >= convertTimeToSeconds(segment.startTime) &&
                        currentTime <= convertTimeToSeconds(segment.endTime)
                    )
                    .map(segment => ({
                        ...segment,
                        speakerId: speaker.speakerId
                    }))
            );

            if (activeSegments.length > 0) {
                const latestSegment = activeSegments[activeSegments.length - 1];
                const chunks = latestSegment.content.split(' ');
                const totalWords = chunks.length;
                const timeElapsed = currentTime - convertTimeToSeconds(latestSegment.startTime);
                const totalDuration = convertTimeToSeconds(latestSegment.endTime) - convertTimeToSeconds(latestSegment.startTime);
                const wordIndex = Math.floor((timeElapsed / totalDuration) * totalWords);

                setDisplayedText(chunks.slice(0, wordIndex + 1).join(' '));
                setCurrentSpeaker({ speakerId: latestSegment.speakerId });
            } else {
                setDisplayedText("");
                setCurrentSpeaker(null);
            }
        }
    }, [currentTime, speakers, isPlaying]);

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
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                                Speaker {currentSpeaker?.speakerId}:
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }}>
                                {displayedText}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body1" sx={{ marginTop: 3 }}>
                            No active speaker at the moment.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default Home;
