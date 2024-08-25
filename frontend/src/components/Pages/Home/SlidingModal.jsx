import React from 'react';
import { Modal, Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

// Add sliding animation CSS
const SlidingBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    width: '100%',
    maxWidth: '500px',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    overflow: 'auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    '&.open': {
        transform: 'translateX(0)',
    },
}));

const SlidingModal = ({ open, onClose, children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SlidingBox className={open ? 'open' : ''}>
                {children}
            </SlidingBox>
        </Modal>
    );
};

export default SlidingModal;
