#!/bin/bash

# Runs one pytest file or directory under aviator-ci, which uploads the log and
# JUnit results to Aviator when it fails.
# Usage: ./pytest_single.sh <test_file.py | test_dir>

set -euo pipefail

if [ $# -eq 0 ]; then
    echo "Usage: $0 <test_file.py | test_dir>"
    exit 1
fi
target=$1
if [ ! -e "$target" ]; then
    echo "Error: '$target' not found"
    exit 1
fi

AVIATOR_CI_VERSION=v0.1.0
os=$(uname -s | tr '[:upper:]' '[:lower:]')
arch=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')
bin="aviator-ci_${os}_${arch}"
if [ ! -x "./$bin" ]; then
    base="https://github.com/aviator-co/ci-uploader/releases/download/$AVIATOR_CI_VERSION"
    curl -fsSLO "$base/$bin"
    curl -fsSL "$base/checksums.txt" | grep " $bin\$" | shasum -a 256 -c -
    chmod +x "./$bin"
fi

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip -q
pip install pytest -q

# flaky_demo/conftest.py arms the flake on the queue's draft PR, first attempt
# only. A rebuild from the rerun webhook counts as a second attempt.
export HEAD_REF="${BUILDKITE_BRANCH:-}"
if [ -n "${BUILDKITE_REBUILT_FROM_BUILD_NUMBER:-}" ] || [ "${BUILDKITE_RETRY_COUNT:-0}" != "0" ]; then
    export RUN_ATTEMPT=2
else
    export RUN_ATTEMPT=1
fi

report="reports/$(basename "$target" .py).xml"
echo "Running: $target"
"./$bin" run \
    --repo jain-av/mq-demo \
    --commit "$BUILDKITE_COMMIT" \
    --build-url "$BUILDKITE_BUILD_URL" \
    --check "buildkite/$BUILDKITE_PIPELINE_SLUG" \
    --junit "$report" \
    -- python -m pytest "$target" -v --tb=short --junitxml="$report"
