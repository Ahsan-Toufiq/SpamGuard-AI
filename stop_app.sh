#!/bin/bash

echo "🛑 Stopping SpamGuard AI..."

# Kill processes by PID if .pids file exists
if [ -f ".pids" ]; then
    PIDS=$(cat .pids)
    for PID in $PIDS; do
        if kill -0 $PID 2>/dev/null; then
            echo "🔧 Stopping process $PID..."
            kill $PID
        fi
    done
    rm .pids
fi

# Also kill by port (backup method)
echo "🔍 Checking for running services..."

# Kill backend (port 5000)
BACKEND_PID=$(lsof -ti:5000)
if [ ! -z "$BACKEND_PID" ]; then
    echo "🔧 Stopping backend (PID: $BACKEND_PID)..."
    kill $BACKEND_PID
fi

# Kill frontend (port 3000)
FRONTEND_PID=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "🎨 Stopping frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID
fi

# Wait a moment
sleep 2

# Force kill if still running
BACKEND_PID=$(lsof -ti:5000)
if [ ! -z "$BACKEND_PID" ]; then
    echo "💀 Force killing backend..."
    kill -9 $BACKEND_PID
fi

FRONTEND_PID=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "💀 Force killing frontend..."
    kill -9 $FRONTEND_PID
fi

echo "✅ SpamGuard AI stopped successfully!" 