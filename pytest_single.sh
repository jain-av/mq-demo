#!/bin/bash

# Script to set up environment and run a single pytest file
# Usage: ./pytest_single.sh <test_file.py>

set -e  # Exit on any error

# Check if test file argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No test file provided"
    echo "Usage: $0 <test_file.py>"
    exit 1
fi

test_file=$1

# Check if the test file exists
if [ ! -f "$test_file" ]; then
    echo "Error: Test file '$test_file' not found"
    exit 1
fi

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install pytest
pip install --upgrade pip -q
pip install pytest -q

# Run the test file
echo "Running: $test_file"
echo "----------------------------------------"
pytest "$test_file" -v

# Deactivate virtual environment
deactivate
