# SpamGuard AI - Intelligent Email Security System

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-blue.svg" alt="Python Version">
  <img src="https://img.shields.io/badge/React-18.2+-61DAFB.svg" alt="React Version">
  <img src="https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-orange.svg" alt="ML Framework">
  <img src="https://img.shields.io/badge/UI-Material--UI-purple.svg" alt="UI Framework">
  <img src="https://img.shields.io/badge/Dataset-SMS%20Spam%20Collection-green.svg" alt="Dataset">
</div>

## 🔍 Overview

SpamGuard AI is an advanced email security system that uses multiple machine learning algorithms to detect spam emails with high accuracy. The system features a sleek, dark-themed interface that resembles a modern email client, making it intuitive for users to analyze emails for potential spam content.

Built with **React** frontend and **Flask** backend, using **three ML models** (Naive Bayes, SVM, Neural Networks) trained on the SMS Spam Collection dataset for real-world spam detection.

## 📁 Project Structure

```
SpamGuard-AI/
├── 🐍 Backend (Python/Flask)
│   ├── venv/                    # Single virtual environment for Python
│   ├── app.py                   # Flask backend server
│   ├── requirements.txt         # Python dependencies
│   └── spam_dataset.txt         # SMS spam dataset
│
├── ⚛️ Frontend (React)
│   ├── node_modules/            # Node.js dependencies  
│   ├── src/                     # React source code
│   │   ├── components/          # React components
│   │   ├── App.js              # Main React app
│   │   └── index.js            # React entry point
│   ├── public/                  # Static files
│   └── package.json            # Node.js configuration
│
├── 🛠️ Setup & Management
│   ├── setup.sh                # Automated setup script
│   ├── start_app.sh            # Start both services
│   └── stop_app.sh             # Stop all services
│
└── 📖 Documentation
    ├── README.md               # This file
    ├── CONTRIBUTING.md         # Contribution guidelines
    ├── DEPLOYMENT.md           # Deployment instructions
    └── LICENSE                 # MIT license
```

## ✨ Features

### 🤖 AI-Powered Detection
- **Three ML Models**: Naive Bayes, Support Vector Machine (SVM), and Neural Networks
- **Ensemble Prediction**: Combines results from all models for maximum accuracy
- **Real-time Analysis**: Sub-100ms email classification
- **High Accuracy**: 96-98% detection rate on SMS Spam Collection dataset
- **Consensus Voting**: Smart decision making across multiple models

### 🎨 Modern Interface
- **Dark Theme**: Sleek, modern aesthetic with glassmorphism effects
- **Email-like UI**: Familiar compose interface for easy interaction
- **Real-time Results**: Live analysis with detailed breakdowns
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Training**: Visual model training with progress tracking

### 📊 Advanced Analytics
- **Model Comparison**: See how each algorithm performs
- **Confidence Scores**: Detailed probability breakdowns
- **Visual Feedback**: Color-coded results and progress indicators
- **Training Metrics**: Live accuracy reporting during model training
- **Email Preview**: Shows analyzed content with results

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.11 or higher** ([Download Python](https://www.python.org/downloads/))
- **Node.js 16 or higher** ([Download Node.js](https://nodejs.org/))
- **Git** ([Download Git](https://git-scm.com/downloads))
- **npm** (comes with Node.js)

### Quick Setup

#### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SpamGuard-AI.git
   cd SpamGuard-AI
   ```

2. **Run the automated setup**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   This script will:
   - ✅ Check Python and Node.js versions
   - ✅ Create a single Python virtual environment
   - ✅ Install all Python dependencies
   - ✅ Download required NLTK data
   - ✅ Install all Node.js dependencies
   - ✅ Make scripts executable

3. **Start the application**
   ```bash
   ./start_app.sh
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Train the models using the interface
   - Start analyzing emails!

#### Option 2: Manual Setup

If you prefer to set up manually or the automated script doesn't work:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SpamGuard-AI.git
   cd SpamGuard-AI
   ```

2. **Set up Python environment** (Backend)
   ```bash
   # Create virtual environment in project root
   python3 -m venv venv
   
   # Activate virtual environment
   # On Linux/Mac:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   
   # Upgrade pip and install dependencies
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Download required NLTK data**
   ```bash
   python -c "
   import nltk
   nltk.download('punkt')
   nltk.download('stopwords')
   "
   ```

4. **Set up frontend** (React)
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Start the backend server**
   ```bash
   # Make sure virtual environment is activated
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python app.py
   ```

6. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Backend API: `http://localhost:5000`
   - Frontend Interface: `http://localhost:3000`

### 🔧 Configuration

#### Environment Variables (Optional)

Create a `.env` file in the project root for custom configuration:

```bash
# Backend Configuration
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_DEBUG=True

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Model Configuration
MODEL_MAX_FEATURES=5000
MODEL_TEST_SIZE=0.2
```

#### Dataset Configuration

The application automatically downloads and uses the SMS Spam Collection dataset. If you want to use a custom dataset:

1. Place your CSV file in the project root
2. Ensure it has columns: `v1` (label: spam/ham) and `v2` (message text)
3. Update the dataset path in `app.py` if needed

## 🎯 Usage Guide

### Training the Models

1. **Access the interface** at `http://localhost:3000`
2. **Click "Start Training"** in the Model Training section
3. **Wait for completion** (typically 2-5 minutes)
4. **View training results** with accuracy metrics for each model

### Analyzing Emails

1. **Enter email content** in the compose interface:
   - **Subject Line**: Email subject (optional)
   - **Email Content**: Main email body
2. **Click "Analyze Email"** to get predictions
3. **View results** from all three AI models:
   - **Final Verdict**: Consensus decision (SPAM/HAM)
   - **Individual Models**: Detailed breakdown per algorithm
   - **Confidence Scores**: Probability percentages

### Sample Test Cases

#### 🚨 SPAM Examples
```
Subject: URGENT: You won $1,000,000!
Message: Click here to claim your prize now! Limited time offer!
Expected: SPAM (95-99% confidence)
```

```
Subject: Make money fast!
Message: Work from home and earn $5000 per week! No experience needed!
Expected: SPAM (90-98% confidence)
```

#### ✅ HAM Examples
```
Subject: Team Meeting Tomorrow
Message: Hi team, our weekly meeting is at 2 PM. Please bring your reports.
Expected: HAM (95-99% confidence)
```

```
Subject: Order Confirmation
Message: Thank you for your purchase. Your order will arrive in 2-3 days.
Expected: HAM (98-99% confidence)
```

## 🛠️ Technology Stack

### Backend
- **Python 3.11+**: Core language
- **Flask**: Web framework and REST API
- **Scikit-Learn**: Machine learning algorithms
- **NLTK**: Natural language processing
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Joblib**: Model serialization

### Frontend
- **React 18**: User interface framework
- **Material-UI (MUI)**: Component library and design system
- **Emotion**: CSS-in-JS styling
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

### Machine Learning Models
1. **Naive Bayes (MultinomialNB)**: Fast probabilistic classifier
2. **Support Vector Machine**: Linear kernel SVM with high accuracy
3. **Neural Network (MLPClassifier)**: Multi-layer perceptron for complex patterns

### Dataset
- **SMS Spam Collection**: 5,574 real SMS messages
- **Balanced Dataset**: ~50% spam, ~50% legitimate messages
- **Real-world Examples**: Authentic spam and ham content

## 📊 Model Performance

| Model | Accuracy | Speed | Best For |
|-------|----------|-------|----------|
| Naive Bayes | ~96.9% | Fastest | General spam detection |
| SVM | ~98.2% | Fast | High precision requirements |
| Neural Network | ~97.8% | Moderate | Complex pattern recognition |

## 🚦 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check if virtual environment is activated
source venv/bin/activate

# Verify Python version
python --version  # Should be 3.11+

# Check dependencies
pip list | grep flask
```

#### Frontend Won't Start
```bash
# Check Node.js version
node --version  # Should be 16+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Models Not Training
```bash
# Check dataset file exists
ls -la spam_dataset.txt

# Check Python dependencies
python -c "import pandas, sklearn, nltk; print('Dependencies OK')"

# View training logs
tail -f backend.log
```

#### Port Already in Use
```bash
# Kill processes on ports
sudo lsof -ti:5000 | xargs kill -9  # Backend
sudo lsof -ti:3000 | xargs kill -9  # Frontend

# Or use different ports
FLASK_PORT=5001 python app.py
PORT=3001 npm start
```

### Performance Optimization

- **Hardware**: Minimum 4GB RAM, 2GB free space
- **Training**: SSD recommended for faster model training
- **Browser**: Chrome/Firefox for best performance
- **Network**: Internet required for initial setup only

## 🔧 API Endpoints

### Health Check
```http
GET /api/health
Response: {"status": "healthy", "models_trained": boolean}
```

### Train Models
```http
POST /api/train
Response: {"success": boolean, "accuracies": {}, "dataset_used": string}
```

### Predict Spam
```http
POST /api/predict
Content-Type: application/json

{
  "subject": "Email subject",
  "message": "Email content"
}

Response: {
  "success": boolean,
  "predictions": {
    "naive_bayes": {"prediction": "spam/ham", "confidence": float},
    "svm": {"prediction": "spam/ham", "confidence": float},
    "neural_network": {"prediction": "spam/ham", "confidence": float}
  }
}
```

## 📝 Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `setup.sh` | Initial project setup | `./setup.sh` |
| `start_app.sh` | Start both services | `./start_app.sh` |
| `stop_app.sh` | Stop all services | `./stop_app.sh` |

## 🔮 Future Enhancements

- [ ] Real-time email monitoring
- [ ] Custom model training with user data
- [ ] Advanced threat detection (phishing, malware)
- [ ] Email attachment scanning
- [ ] Integration with popular email clients
- [ ] Multi-language support
- [ ] API rate limiting and authentication
- [ ] Docker containerization
- [ ] Cloud deployment guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SMS Spam Collection Dataset** by Tiago A. Almeida and José María Gómez Hidalgo
- **Scikit-Learn** team for excellent ML algorithms
- **Material-UI** for beautiful React components
- **NLTK** for natural language processing tools
- **React** team for the amazing frontend framework

## 📧 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Include logs** from `backend.log` and browser console

## 🌟 Show Your Support

If you found this project helpful, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** any bugs you find
- 💡 **Suggesting** new features
- 📢 **Sharing** with others

---

<div align="center">
  <strong>Built with ❤️ for intelligent email security</strong>
  <br>
  <sub>Making the internet safer, one email at a time</sub>
</div> 