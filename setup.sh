#!/bin/bash

echo "🔧 Setting up SpamGuard AI..."

# Check Python version
python_version=$(python3 --version 2>&1 | cut -d' ' -f2 | cut -d'.' -f1,2)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python 3.11+ required. Found: $python_version"
    exit 1
fi

echo "✅ Python version check passed"

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi

node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 16 ]; then
    echo "❌ Node.js 16+ required. Found: v$node_version"
    exit 1
fi

echo "✅ Node.js version check passed"

# Create Python virtual environment (single venv for the entire project)
echo "🐍 Creating Python virtual environment..."
if [ -d "venv" ]; then
    echo "📁 Virtual environment already exists, using existing one"
else
    python3 -m venv venv
fi

# Activate virtual environment
echo "📦 Activating virtual environment and installing Python dependencies..."
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies
pip install pandas scikit-learn nltk numpy flask flask-cors joblib

# Download NLTK data
echo "📚 Downloading NLTK data..."
python -c "
import nltk
try:
    nltk.data.find('tokenizers/punkt')
    print('✅ NLTK punkt already downloaded')
except LookupError:
    print('📥 Downloading NLTK punkt...')
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
    print('✅ NLTK stopwords already downloaded')
except LookupError:
    print('📥 Downloading NLTK stopwords...')
    nltk.download('stopwords')
"

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
else
    echo "❌ package.json not found in frontend directory"
    exit 1
fi
cd ..

# Make scripts executable
chmod +x start_app.sh stop_app.sh

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📁 Project Structure:"
echo "  ├── venv/                 # Python virtual environment (backend)"
echo "  ├── frontend/             # React application"
echo "  │   ├── node_modules/     # Node.js dependencies"
echo "  │   ├── src/              # React source code"
echo "  │   └── package.json      # Node.js configuration"
echo "  ├── app.py               # Flask backend"
echo "  ├── requirements.txt     # Python dependencies"
echo "  └── spam_dataset.txt     # SMS spam dataset"
echo ""
echo "📋 Next steps:"
echo "1. Run './start_app.sh' to start the application"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Train the models using the interface"
echo "4. Start analyzing emails!"
echo ""
echo "📝 Available commands:"
echo "  ./start_app.sh  - Start both backend and frontend"
echo "  ./stop_app.sh   - Stop both services"
echo "" 