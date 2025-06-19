import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Mail, Send, AlertTriangle } from 'lucide-react';

const EmailComposer = ({ onSubmit, isLoading, disabled }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.subject.trim() || formData.message.trim()) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.subject.trim() || formData.message.trim();

  return (
    <Paper elevation={8} sx={{ p: 3, height: 'fit-content' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Mail size={24} style={{ marginRight: 12, color: '#6366f1' }} />
        <Typography variant="h6" component="h2">
          Compose Email
        </Typography>
      </Box>

      {disabled && (
        <Box 
          display="flex" 
          alignItems="center" 
          p={2} 
          mb={2} 
          sx={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 2 
          }}
        >
          <AlertTriangle size={20} style={{ marginRight: 8, color: '#ef4444' }} />
          <Typography variant="body2" color="error">
            Please train the models first before analyzing emails
          </Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Subject Line
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter email subject..."
            value={formData.subject}
            onChange={handleChange('subject')}
            disabled={disabled || isLoading}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    Subject:
                  </Box>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }}
          />
        </Box>

        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email Content
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={12}
            placeholder="Enter email content..."
            value={formData.message}
            onChange={handleChange('message')}
            disabled={disabled || isLoading}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }}
          />
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {isFormValid ? 'Ready for analysis' : 'Enter subject or message to analyze'}
          </Typography>
          
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid || disabled || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Send size={20} />}
            sx={{
              background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
              boxShadow: '0 3px 5px 2px rgba(99, 102, 241, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)',
              }
            }}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Email'}
          </Button>
        </Box>
      </form>

      <Box mt={3} p={2} sx={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>How it works:</strong> Our AI analyzes your email using three machine learning models:
          Naive Bayes, SVM, and Neural Networks to detect spam with high accuracy.
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmailComposer; 