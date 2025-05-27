#!/bin/bash
# Simple startup script that uses system Python (for devcontainers/codespaces)
set -e

echo "Starting Recipe API Backend (simple mode)..."

# Install dependencies globally (for devcontainer environments)
echo "Installing dependencies..."
pip install fastapi uvicorn sqlalchemy pydantic python-multipart

# Seed database with sample data
echo "Seeding database..."
python3 seed_data.py

# Start the server
echo "Starting FastAPI server..."
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000