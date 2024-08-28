import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const UploadAudio = ({ open, onClose, onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file.name); // Call the parent function with the file name
        }
    };

    const handleUpload = () => {
        if (file) {
            // Handle file upload logic here
            console.log('File selected:', file);
            // Reset file input
            setFile(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Upload Audio File</DialogTitle>
            <DialogContent>
                <input
                    accept="audio/*"
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="File Name"
                    value={file ? file.name : ''}
                    InputProps={{ readOnly: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpload} color="primary" startIcon={<CloudUpload />}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadAudio;
