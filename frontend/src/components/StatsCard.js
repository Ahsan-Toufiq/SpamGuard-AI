import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StatsCard = ({ title, value, subtitle, icon, color = 'primary' }) => {
  const colorMap = {
    primary: '#6366f1',
    secondary: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    success: '#10b981'
  };

  const bgColorMap = {
    primary: 'rgba(99, 102, 241, 0.1)',
    secondary: 'rgba(16, 185, 129, 0.1)',
    warning: 'rgba(245, 158, 11, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    success: 'rgba(16, 185, 129, 0.1)'
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        height: '100%',
        background: `linear-gradient(135deg, ${bgColorMap[color]} 0%, rgba(26, 26, 26, 0.8) 100%)`,
        border: `1px solid ${colorMap[color]}30`,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${colorMap[color]}20`
        }
      }}
    >
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box flex={1}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: colorMap[color] }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            color: colorMap[color], 
            opacity: 0.8,
            ml: 2
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};

export default StatsCard; 