import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0D0C1D, #0E1D2F, #0F1D30)', // Adjusted gradient
                color: '#ffffff',
                padding: 3,
                overflow: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to Home
            </Typography>
        </Box>
    );
};

export default Home;
