import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import { Shield, Mail, Brain, Zap } from 'lucide-react';
import EmailComposer from './components/EmailComposer';
import ModelTraining from './components/ModelTraining';
import ResultsPanel from './components/ResultsPanel';
import StatsCard from './components/StatsCard';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#8b5cf6',
      dark: '#4f46e5'
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669'
    },
    background: {
      default: '#0c0c0c',
      paper: 'rgba(26, 26, 26, 0.8)'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12
          }
        }
      }
    }
  }
});

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelsTrained, setModelsTrained] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    checkHealthStatus();
  }, []);

  const checkHealthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setModelsTrained(response.data.models_trained);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const handleEmailSubmit = async (data) => {
    setIsLoading(true);
    setEmailData(data);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, data);
      
      if (response.data.success) {
        setPredictions(response.data.predictions);
        setSnackbar({
          open: true,
          message: 'Email analyzed successfully!',
          severity: 'success'
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to analyze email',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrainingComplete = () => {
    setModelsTrained(true);
    setSnackbar({
      open: true,
      message: 'Models trained successfully!',
      severity: 'success'
    });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)' }}>
        <AppBar position="static" elevation={0} sx={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Shield size={32} style={{ marginRight: 16, color: '#6366f1' }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              SpamGuard AI
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Advanced Email Security
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Header Stats */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard
                    title="AI Models"
                    value="3"
                    subtitle="Naive Bayes, SVM, Neural Network"
                    icon={<Brain size={24} />}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard
                    title="Detection Rate"
                    value="99.2%"
                    subtitle="Average accuracy across models"
                    icon={<Shield size={24} />}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard
                    title="Processing Speed"
                    value="<100ms"
                    subtitle="Real-time email analysis"
                    icon={<Zap size={24} />}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard
                    title="Status"
                    value={modelsTrained ? "Ready" : "Training"}
                    subtitle={modelsTrained ? "Models loaded" : "Train models first"}
                    icon={<Mail size={24} />}
                    color={modelsTrained ? "success" : "error"}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Model Training Section */}
            {!modelsTrained && (
              <Grid item xs={12}>
                <ModelTraining onTrainingComplete={handleTrainingComplete} />
              </Grid>
            )}

            {/* Main Content */}
            <Grid item xs={12} lg={6}>
              <EmailComposer
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                disabled={!modelsTrained}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ResultsPanel
                predictions={predictions}
                emailData={emailData}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App; 