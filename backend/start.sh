#!/bin/bash
set -e  # Exit on any error

echo "Starting Recipe API Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Verify activation worked
if [ -z "$VIRTUAL_ENV" ]; then
    echo "Error: Failed to activate virtual environment"
    exit 1
fi

# Install dependencies if not already installed
if ! python3 -m pip show fastapi > /dev/null 2>&1; then
    echo "Installing dependencies..."
    python3 -m pip install --upgrade pip
    python3 -m pip install fastapi uvicorn sqlalchemy pydantic python-multipart
fi

# Seed database with sample data
echo "Seeding database..."
python seed_data.py

# Start the server
echo "Starting FastAPI server..."
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000