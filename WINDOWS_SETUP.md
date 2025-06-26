# SpamGuard AI - Windows Setup Guide

This guide will help you set up and run the SpamGuard AI project on Windows.

## Prerequisites

1. **Python 3.11 or higher**
   - Download from [Python's official website](https://www.python.org/downloads/)
   - During installation, make sure to check "Add Python to PATH"
   - Verify installation by opening Command Prompt and running:
     ```
     python --version
     ```

2. **Node.js 16 or higher**
   - Download from [Node.js official website](https://nodejs.org/)
   - Verify installation by opening Command Prompt and running:
     ```
     node --version
     ```

## Setup Instructions

1. **Clone the Repository**
   ```cmd
   git clone <repository-url>
   cd SpamEmailDetection
   ```

2. **Create and Activate Python Virtual Environment**
   ```cmd
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install Python Dependencies**
   ```cmd
   python -m pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Download NLTK Data**
   ```cmd
   python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
   ```

5. **Install Frontend Dependencies**
   ```cmd
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

1. **Start the Backend (Flask Server)**
   Open a Command Prompt window and run:
   ```cmd
   venv\Scripts\activate
   python app.py
   ```

2. **Start the Frontend (React App)**
   Open another Command Prompt window and run:
   ```cmd
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Open your web browser and navigate to: http://localhost:3000
   - The backend API will be running on: http://localhost:5000

## Project Structure
```
SpamEmailDetection/
├── venv/                 # Python virtual environment
├── frontend/            # React application
│   ├── node_modules/    # Node.js dependencies
│   ├── src/             # React source code
│   └── package.json     # Node.js configuration
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
└── spam_dataset.txt   # SMS spam dataset
```

## Troubleshooting

1. **Python Command Not Found**
   - Make sure Python is added to your system's PATH
   - Try using `python3` instead of `python` if available

2. **Permission Issues**
   - Run Command Prompt as Administrator
   - Check Windows Defender or antivirus settings

3. **Port Already in Use**
   - Backend (Flask): Check if port 5000 is free
   - Frontend (React): Check if port 3000 is free
   - To kill a process using a port:
     ```cmd
     netstat -ano | findstr :5000
     taskkill /PID <PID> /F
     ```

## Notes

- Always keep the virtual environment activated when running Python commands
- The backend must be running for the frontend to function properly
- Both frontend and backend servers must be running simultaneously
- To stop the servers, press Ctrl+C in their respective Command Prompt windows

## Support

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Review the error messages in the Command Prompt
3. Create an issue in the project repository with:
   - Error message
   - Steps to reproduce
   - Windows version
   - Python and Node.js versions 