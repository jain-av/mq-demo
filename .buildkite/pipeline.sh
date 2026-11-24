#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

echo "agents:"
echo "  queue: aviator-ci"
echo "steps:"

test_files=$(find . -maxdepth 1 -name "test_*.py" -type f | sort)

# one command step per top-level test file, plus the flaky demo suite
for test_file in $test_files flaky_demo; do
  echo "  - label: \"${test_file#./}\""
  echo "    command: \"./pytest_single.sh ${test_file}\""
done
