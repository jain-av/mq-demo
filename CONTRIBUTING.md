# Contributing

Thank you for your interest in contributing to this project!

## Prerequisites

- Python 3.12
- pip

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mq-demo
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install pytest flake8
   ```

## Running Tests

Run all tests with pytest:
```bash
pytest
```

Alternatively, use the provided Buildkite script:
```bash
./buildkite_run.sh
```

## Running the Linter

Run flake8 to check for style issues:
```bash
flake8 .
```
