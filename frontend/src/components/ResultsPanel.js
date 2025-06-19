import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import { Shield, AlertTriangle, CheckCircle, Zap, Brain, Target } from 'lucide-react';

const ModelResultCard = ({ modelName, result, icon }) => {
  const isSpam = result.prediction === 'spam';
  const confidence = Math.round(result.confidence * 100);
  
  const modelDisplayNames = {
    'naive_bayes': 'Naive Bayes',
    'svm': 'Support Vector Machine',
    'neural_network': 'Neural Network'
  };

  return (
    <Card sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.05)' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {modelDisplayNames[modelName]}
            </Typography>
          </Box>
          <Chip
            label={result.prediction.toUpperCase()}
            color={isSpam ? 'error' : 'success'}
            variant="filled"
            sx={{
              fontWeight: 'bold',
              background: isSpam 
                ? 'linear-gradient(45deg, #ef4444 30%, #dc2626 90%)'
                : 'linear-gradient(45deg, #10b981 30%, #059669 90%)'
            }}
          />
        </Box>
        
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Confidence
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {confidence}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={confidence}
            sx={{
              height: 8,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: isSpam 
                  ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                borderRadius: 4
              }
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box textAlign="center" p={1} sx={{ background: 'rgba(239, 68, 68, 0.1)', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Spam Probability
              </Typography>
              <Typography variant="h6" color="error">
                {Math.round(result.spam_probability * 100)}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center" p={1} sx={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Ham Probability
              </Typography>
              <Typography variant="h6" color="success.main">
                {Math.round(result.ham_probability * 100)}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ResultsPanel = ({ predictions, emailData, isLoading }) => {
  if (isLoading) {
    return (
      <Paper elevation={8} sx={{ p: 3, height: 'fit-content' }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Zap size={24} style={{ marginRight: 12, color: '#6366f1' }} />
          <Typography variant="h6">
            Analysis in Progress
          </Typography>
        </Box>
        
        <Box textAlign="center" py={4}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Analyzing email with AI models...
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (!predictions) {
    return (
      <Paper elevation={8} sx={{ p: 3, height: 'fit-content' }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Shield size={24} style={{ marginRight: 12, color: '#6366f1' }} />
          <Typography variant="h6">
            Analysis Results
          </Typography>
        </Box>
        
        <Box textAlign="center" py={6}>
          <Shield size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Ready for Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Submit an email to see detailed spam detection results from our AI models
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Calculate consensus
  const spamCount = Object.values(predictions).filter(p => p.prediction === 'spam').length;
  const totalModels = Object.keys(predictions).length;
  const consensus = spamCount > totalModels / 2 ? 'spam' : 'ham';
  const consensusConfidence = spamCount / totalModels;

  return (
    <Paper elevation={8} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Shield size={24} style={{ marginRight: 12, color: '#6366f1' }} />
        <Typography variant="h6">
          Analysis Results
        </Typography>
      </Box>

      {/* Email Preview */}
      <Box mb={3} p={2} sx={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Analyzed Email
        </Typography>
        {emailData.subject && (
          <Typography variant="body2" gutterBottom>
            <strong>Subject:</strong> {emailData.subject}
          </Typography>
        )}
        {emailData.message && (
          <Typography variant="body2" sx={{ 
            maxHeight: 60, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis'
          }}>
            <strong>Content:</strong> {emailData.message.substring(0, 100)}
            {emailData.message.length > 100 && '...'}
          </Typography>
        )}
      </Box>

      {/* Consensus Result */}
      <Alert
        severity={consensus === 'spam' ? 'error' : 'success'}
        icon={consensus === 'spam' ? <AlertTriangle /> : <CheckCircle />}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6" gutterBottom>
          Final Verdict: {consensus.toUpperCase()}
        </Typography>
        <Typography variant="body2">
          {spamCount} out of {totalModels} models classified this as spam
          ({Math.round(consensusConfidence * 100)}% consensus)
        </Typography>
      </Alert>

      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Individual Model Results */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Model Breakdown
      </Typography>

      {predictions.naive_bayes && (
        <ModelResultCard
          modelName="naive_bayes"
          result={predictions.naive_bayes}
          icon={<Brain size={20} style={{ color: '#6366f1' }} />}
        />
      )}

      {predictions.svm && (
        <ModelResultCard
          modelName="svm"
          result={predictions.svm}
          icon={<Target size={20} style={{ color: '#8b5cf6' }} />}
        />
      )}

      {predictions.neural_network && (
        <ModelResultCard
          modelName="neural_network"
          result={predictions.neural_network}
          icon={<Zap size={20} style={{ color: '#10b981' }} />}
        />
      )}
    </Paper>
  );
};

export default ResultsPanel; 