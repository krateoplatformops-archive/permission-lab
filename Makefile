# Set the shell to bash always
SHELL := /bin/bash

.PHONY: tidy
tidy: ## go mod tidy
	go mod tidy


.PHONY: generate
generate: ## generate all CRDs
generate: tidy
	go generate ./...


.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ./Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'