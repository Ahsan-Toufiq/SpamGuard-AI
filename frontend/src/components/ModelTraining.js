import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import { PlayCircle, Database, Brain, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ModelTraining = ({ onTrainingComplete }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [accuracies, setAccuracies] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    {
      label: 'Load Dataset',
      description: 'Loading Enron spam dataset...',
      icon: <Database size={20} />
    },
    {
      label: 'Train Models',
      description: 'Training Naive Bayes, SVM, and Neural Network models...',
      icon: <Brain size={20} />
    },
    {
      label: 'Complete',
      description: 'Models trained and ready for predictions',
      icon: <CheckCircle size={20} />
    }
  ];

  const handleTraining = async () => {
    setIsTraining(true);
    setError(null);
    setActiveStep(0);

    try {
      // Simulate step progression
      setTimeout(() => setActiveStep(1), 1000);
      
      const response = await axios.post('http://localhost:5000/api/train');
      
      if (response.data.success) {
        setAccuracies(response.data.accuracies);
        setActiveStep(2);
        setTimeout(() => {
          onTrainingComplete();
        }, 1500);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Training failed');
      setActiveStep(0);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <Paper elevation={8} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Brain size={24} style={{ marginRight: 12, color: '#6366f1' }} />
        <Typography variant="h6">
          Model Training
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Train the machine learning models on the Enron spam dataset to enable email classification.
          This process may take a few minutes.
        </Typography>
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
      )}

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              icon={step.icon}
              sx={{
                '& .MuiStepLabel-iconContainer': {
                  color: index <= activeStep ? '#6366f1' : 'text.secondary'
                }
              }}
            >
              <Typography variant="h6">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {step.description}
              </Typography>
              
              {index === activeStep && isTraining && (
                <LinearProgress sx={{ my: 2 }} />
              )}
              
              {index === 2 && accuracies && (
                <Box mt={2}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Training Results:</strong>
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2">
                      • Naive Bayes: {(accuracies.naive_bayes * 100).toFixed(2)}%
                    </Typography>
                    <Typography variant="body2">
                      • SVM: {(accuracies.svm * 100).toFixed(2)}%
                    </Typography>
                    <Typography variant="body2">
                      • Neural Network: {(accuracies.neural_network * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {!isTraining && activeStep === 0 && (
        <Box mt={3}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayCircle size={20} />}
            onClick={handleTraining}
            sx={{
              background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
              boxShadow: '0 3px 5px 2px rgba(99, 102, 241, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)',
              }
            }}
          >
            Start Training
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ModelTraining; 