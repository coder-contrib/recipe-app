#!/bin/bash
echo "Starting Recipe API Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if not already installed
if ! pip show fastapi > /dev/null 2>&1; then
    echo "Installing dependencies..."
    pip install fastapi uvicorn sqlalchemy pydantic python-multipart
fi

# Seed database with sample data
python seed_data.py

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000