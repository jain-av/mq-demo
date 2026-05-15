# Contributing

## Prerequisites

- Python 3.12+

## Setup

1. Create a virtual environment:

   ```bash
   python3 -m venv venv
   ```

2. Activate the virtual environment:

   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install --upgrade pip
   pip install pytest flake8
   ```

## Running Tests

Run all tests:

```bash
pytest test_*.py -v
```

Run a single test file:

```bash
./pytest_single.sh <test_file>
```

## Linting

Run flake8 to check for syntax errors and undefined names:

```bash
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

Run flake8 with full style checks (warnings only):

```bash
flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
```
