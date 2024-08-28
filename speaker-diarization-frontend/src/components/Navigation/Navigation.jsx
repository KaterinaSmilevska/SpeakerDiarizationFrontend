import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    IconButton
} from '@mui/material';
import { Home, Description, ImportExport, ChevronRight, ChevronLeft } from '@mui/icons-material';
import sound from '../../assets/sound.png';
import UploadAudio from "../UploadAudio/UploadAudio";

const drawerWidth = 300;
const collapsedWidth = 80;

const selectedGradient = 'linear-gradient(90deg, #0F2A3E, #10263C)';

const Navigation = ({ onFileUpload }) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const openUploadAudio= () => {
        setIsModalOpen(true);
    };

    const closeUploadAudio = () => {
        setIsModalOpen(false);
    };

    const handleFileUpload = (name) => {
        onFileUpload(name);
        closeUploadAudio();
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: open ? drawerWidth : collapsedWidth,
                height: '100%',
                transition: 'width 0.3s',
            }}
        >
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? drawerWidth : collapsedWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : collapsedWidth,
                        boxSizing: 'border-box',
                        background: 'linear-gradient(180deg, #0D0C1D, #0E1D2F, #0F1D30)',
                        color: '#ffffff',
                        transition: 'width 0.3s',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 2,
                            color: '#ffffff',
                            justifyContent: open ? 'space-between' : 'center',
                        }}
                    >
                        {open ? (
                            <>
                                <img
                                    src={sound}
                                    alt="Logo"
                                    style={{ width: 40, height: 40, marginRight: 8 }}
                                />
                                <Typography variant="h6">App Name</Typography>
                                <IconButton onClick={handleDrawerToggle} aria-label="Collapse menu">
                                    <ChevronLeft sx={{ color: 'white' }} />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton onClick={handleDrawerToggle} aria-label="Expand menu">
                                <ChevronRight sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                    </Box>

                    <List
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            overflowY: 'auto', // Add overflow handling if needed
                        }}
                    >
                        <ListItem
                            button
                            component={Link}
                            to="/"
                            sx={{
                                background: pathname === "/" ? selectedGradient : 'inherit',
                                color: pathname === "/" ? '#ffffff' : 'inherit',
                                borderRadius: 2,
                                padding: '8px 16px',
                                minHeight: 'auto',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <Home />
                            </ListItemIcon>
                            {open && <ListItemText primary="Home" primaryTypographyProps={{ style: { color: 'inherit' } }} />}
                        </ListItem>
                        <ListItem
                            button
                            onClick={openUploadAudio}
                            sx={{
                                background: pathname === "/documents" ? selectedGradient : 'inherit',
                                color: pathname === "/documents" ? '#ffffff' : 'inherit',
                                borderRadius: 2,
                                padding: '8px 16px',
                                minHeight: 'auto',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <Description />
                            </ListItemIcon>
                            {open && <ListItemText primary="Upload File" primaryTypographyProps={{ style: { color: 'inherit' } }} />}
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/export"
                            sx={{
                                background: pathname === "/export" ? selectedGradient : 'inherit',
                                color: pathname === "/export" ? '#ffffff' : 'inherit',
                                borderRadius: 2,
                                padding: '8px 16px',
                                minHeight: 'auto',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <ImportExport />
                            </ListItemIcon>
                            {open && <ListItemText primary="Export" primaryTypographyProps={{ style: { color: 'inherit' } }} />}
                        </ListItem>
                    </List>

                    <Divider sx={{ backgroundColor: '#ffffff' }} />
                </Box>
            </Drawer>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(15, 13, 32, 0.7) 0%, rgba(5, 4, 11, 0) 108.33%)',
                    borderLeft: '4px solid #10263C',
                }}
            />

            <UploadAudio open={isModalOpen} onClose={closeUploadAudio} onFileUpload = {handleFileUpload} />
        </Box>
    );
};

export default Navigation;
