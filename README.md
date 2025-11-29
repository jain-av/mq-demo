# mq-demo

A demonstration project showcasing Python math operations with comprehensive testing and CI/CD integration. This project serves as a template for Python development workflows including automated testing with pytest, Buildkite CI integration, and GitHub Actions workflows.

## Features

- Simple math operations library with well-documented functions
- Comprehensive pytest test suite with multiple test cases
- Buildkite CI/CD integration for automated testing
- GitHub Actions workflows for linting and deployment automation
- Python 3.12 support with virtual environment setup

## Project Structure

```
mq-demo/
├── math_operations.py          # Core math operations module
├── test_math_operations.py     # pytest test suite
├── buildkite_run.sh           # Buildkite CI script
├── .github/workflows/         # GitHub Actions workflows
│   ├── create_check.yml       # Deployment workflow
│   ├── labeler.yml           # Auto-labeling workflow
│   └── linter.yml            # Python linting workflow
└── README.md                 # Project documentation
```

### Key Files

- **math_operations.py** - Contains the `add(a, b)` function for adding two numbers
- **test_math_operations.py** - Comprehensive test cases covering positive numbers, negative numbers, floats, and edge cases
- **buildkite_run.sh** - Shell script that sets up the environment and runs pytest tests in Buildkite CI

## Prerequisites

- Python 3.12 or higher
- pip (Python package installer)
- pytest (for running tests)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jain-av/mq-demo.git
cd mq-demo
```

2. Create a virtual environment:
```bash
python3 -m venv venv
```

3. Activate the virtual environment:
```bash
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install --upgrade pip
pip install pytest
```

## Usage

### Math Operations Module

The `math_operations.py` module provides simple math functions. Currently implemented:

#### `add(a, b)` (math_operations.py:1)

Adds two numbers together and returns the result.

**Parameters:**
- `a`: First number (int or float)
- `b`: Second number (int or float)

**Returns:**
- Sum of a and b (int or float)

**Example:**
```python
from math_operations import add

result = add(2, 3)
print(result)  # Output: 5

result = add(2.5, 3.7)
print(result)  # Output: 6.2

result = add(-5, 10)
print(result)  # Output: 5
```

## Testing

The project includes comprehensive pytest tests covering various scenarios.

### Run All Tests

```bash
pytest test_math_operations.py -v
```

### Test Coverage

The test suite includes the following test cases:

- `test_add_positive_numbers` - Tests addition of positive integers
- `test_add_negative_numbers` - Tests addition of negative integers
- `test_add_mixed_numbers` - Tests addition of negative and positive numbers
- `test_add_zero` - Tests addition with zero
- `test_add_floats` - Tests addition of floating-point numbers

### Running Specific Tests

```bash
# Run a specific test
pytest test_math_operations.py::test_add_positive_numbers -v

# Run tests with detailed output
pytest test_math_operations.py -vv
```

## CI/CD Integration

### Buildkite CI

The project uses Buildkite for continuous integration. The `buildkite_run.sh` script:

1. Displays the build environment and checkout directory
2. Creates and activates a Python virtual environment
3. Installs pytest and required dependencies
4. Runs the test suite with verbose output
5. Reports test results

The Buildkite pipeline automatically runs on each commit and pull request.

### GitHub Actions Workflows

The project includes three GitHub Actions workflows:

#### 1. Linter Workflow (`linter.yml`)
- **Trigger:** On pull requests (excluding branches starting with `mq-tmp-`)
- **Purpose:** Runs flake8 linting to check Python code quality
- **Python Version:** 3.12
- **Actions:**
  - Installs flake8
  - Checks for syntax errors and undefined names
  - Generates code complexity and style statistics

#### 2. Create Check Workflow (`create_check.yml`)
- **Trigger:** Manual workflow dispatch
- **Purpose:** Deployment automation with Aviator integration
- **Python Version:** 3.12
- **Features:**
  - Accepts deployment parameters (deployment ID, commit hash, version)
  - Syncs workflow run with Aviator API
  - Supports custom deployment variables

#### 3. Labeler Workflow (`labeler.yml`)
- **Trigger:** When a pull request is labeled with 'hello'
- **Purpose:** Automatically adds the 'world' label to pull requests
- **Use Case:** Automated PR organization and labeling

## Development Setup

### Local Development

1. Set up your development environment following the [Installation](#installation) steps
2. Make changes to the code
3. Run tests locally to verify your changes:
   ```bash
   pytest test_math_operations.py -v
   ```
4. Run linting to check code quality:
   ```bash
   pip install flake8
   flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
   ```

### Adding New Functions

1. Add your function to `math_operations.py`
2. Include a docstring describing the function
3. Create corresponding tests in `test_math_operations.py`
4. Run the test suite to ensure all tests pass

### Best Practices

- Write tests for all new functions
- Follow PEP 8 style guidelines
- Include docstrings for all functions
- Keep functions simple and focused on a single task
- Ensure all tests pass before committing changes

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes and add tests
4. Ensure all tests pass (`pytest test_math_operations.py -v`)
5. Run linting checks (`flake8 .`)
6. Commit your changes (`git commit -m 'Add some feature'`)
7. Push to the branch (`git push origin feature/your-feature`)
8. Open a Pull Request

Please ensure your code:
- Follows existing code style and conventions
- Includes appropriate tests
- Passes all CI/CD checks
- Includes updated documentation if needed

## License

This project is available for use as a demonstration and template for Python development workflows.

## Support

For questions or issues, please open an issue on the GitHub repository at [jain-av/mq-demo](https://github.com/jain-av/mq-demo).
