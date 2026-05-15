.PHONY: help test lint

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "}; {printf "%-15s %s\n", $$1, $$2}'

test: ## Run the test suite with pytest
	pytest

lint: ## Run flake8 linter
	flake8
