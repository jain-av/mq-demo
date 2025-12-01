#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# begin the pipeline.yml file
echo "steps:"

test_files=$(find . -maxdepth 1 -name "test_*.py" -type f | sort)

# add a new command step to run the tests in each test directory
for test_file in $test_files; do
  echo "  - command: \"pytest_single.sh "${test_file}"\""
done
