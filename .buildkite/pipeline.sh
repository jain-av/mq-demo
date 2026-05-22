#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# begin the pipeline.yml file
echo "steps:"

test_files=$(find . -maxdepth 1 -name "test_*.py" -type f | sort)

# add a new command step to run the tests in each test directory.
# Each step gets an explicit `key:` so Buildkite reports per-step GitHub
# statuses as `buildkite/<pipeline>/<step-key>`. Runbooks relies on the
# step-key segment to scope log fetching to the failing job
# (see https://github.com/aviator-co/mergeit/pull/12044).
for test_file in $test_files; do
  base=$(basename "${test_file}" .py)
  echo "  - label: \":pytest: ${base}\""
  echo "    key: \"${base}\""
  echo "    command: \"./pytest_single.sh ${test_file}\""
  echo "    agents:"
  echo "      queue: \"ankit-laptop-test\""
done
