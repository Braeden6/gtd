.PHONY: up down dev build test lint clean


up:
	docker compose up

down:
	docker compose down

bk:
	source .venv/bin/activate && \
	cd backend && \
	uvicorn src.main:app --reload --host 0.0.0.0

fr:
	cd frontend && \
	pnpm run dev

mb:
	cd mobile && \
	DARK_MODE=media npx expo run:ios --device

mb-fix:
	cd mobile && \
	npx expo prebuild --clean

build:
	docker compose build

sdk:
	cd frontend && \
	pnpm generate-api && \
	pnpm generate-api-mobile

mb-build-preview:
	cd mobile && \
	eas build --platform ios --profile preview

# remember to update .env
fr-build:
	cd frontend && \
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/frontend:latest . && \
	docker push registry.braeden6.com/gtd/frontend:latest

bk-build:
	cd backend && \
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/backend:latest . && \
	docker push registry.braeden6.com/gtd/backend:latest


	