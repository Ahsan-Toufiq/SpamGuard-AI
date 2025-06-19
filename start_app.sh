#!/bin/bash

echo "🚀 Starting SpamGuard AI..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Start backend
echo "🔧 Starting backend server..."
nohup python app.py > backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend started successfully on http://localhost:5000"
else
    echo "❌ Failed to start backend"
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
nohup npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 10

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend started successfully on http://localhost:3000"
else
    echo "❌ Failed to start frontend"
    exit 1
fi

echo ""
echo "🎉 SpamGuard AI is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "📋 To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📝 Logs:"
echo "   Backend: tail -f backend.log"
echo "   Frontend: tail -f frontend.log"

# Save PIDs for cleanup
echo "$BACKEND_PID $FRONTEND_PID" > .pids 