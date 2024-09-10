import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ExportModal = ({ open, onClose, onExport, data }) => {
    const handleExport = () => {
        if (data && data.length > 0) {
            onExport(data);
        } else {
            console.error('No data available for export');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Export Data
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to export the data? This action will generate a downloadable file.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleExport} variant="contained" color="primary">
                        Export
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ExportModal;
