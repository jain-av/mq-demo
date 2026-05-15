.DEFAULT_GOAL := help

.PHONY: help install test lint

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*##"}; {printf "  %-10s %s\n", $$1, $$2}'

install: ## Create virtual environment and install pytest and flake8
	python3 -m venv venv
	venv/bin/pip install --upgrade pip
	venv/bin/pip install pytest flake8

test: ## Run all tests with pytest
	venv/bin/pytest test_*.py -v

lint: ## Run flake8 linting
	venv/bin/flake8 .
