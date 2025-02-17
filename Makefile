.PHONY: up down dev build test lint clean


up:
	docker compose up --build

down:
	docker compose down


build:
	docker compose build


generate-swagger:
	go install github.com/swaggo/swag/cmd/swag@latest
	cd backend && $(HOME)/go/bin/swag init -g cmd/server/main.go -o ./docs

generate-api:
	cd frontend && \
	pnpm generate-api # && \
	# pnpm generate-api-mobile
	
# test-frontend:
# 	docker compose run frontend pnpm test

# test-backend:
# 	docker compose run backend go test ./...

# test: test-frontend test-backend


# lint-frontend:
# 	docker compose run frontend pnpm lint

# lint-backend:
# 	docker compose run backend golangci-lint run

# lint: lint-frontend lint-backend

# clean:
# 	docker compose down -v
# 	rm -rf data/*.db