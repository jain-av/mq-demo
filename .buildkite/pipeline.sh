#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# Only the flaky demo suite: the top-level test files include a deliberately
# failing one, which would fail every build.
cat <<'YAML'
agents:
  queue: aviator-ci-local
steps:
  - label: "flaky_demo"
    command: "./pytest_single.sh flaky_demo"
YAML
