#!/bin/bash
echo "Starting Recipe API Backend..."
source venv/bin/activate
python seed_data.py
uvicorn main:app --reload --host 0.0.0.0 --port 8000