.PHONY: up down dev build test lint clean

MESSAGE ?=init commit

up:
	docker compose up

down:
	docker compose down

setup: 
	cd frontend && \
	pnpm install && \
	cd ../mobile && \
	pnpm install && \
	pnpm run prebuild && \
	cd ../ && \
	uv venv && \
	source .venv/bin/activate && \
	cd shared && \
	uv pip install -e . && \
	cd ../services/transcription && \
	uv pip install -e . && \
	cd ../backend && \
	uv pip install -e . #'.[dev]'


bk:
	source .venv/bin/activate && \
	cd services/backend && \
	uvicorn src.main:app --reload --host 0.0.0.0

transcription:
	source .venv/bin/activate && \
	cd services/transcription && \
	python app/main.py

fr:
	cd frontend && \
	pnpm run dev

mb:
	cd mobile && \
	pnpm run start

mb-fix:
	cd mobile && \
	pnpm prebuild

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
	cd services/backend && \
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/backend:latest . && \
	docker push registry.braeden6.com/gtd/backend:latest

# scp <user>@<server>:/etc/rancher/k3s/k3s.yaml /path/to/save/k3s.yaml
# update the server ip
k9s:
	k9s --kubeconfig ../k3s.yaml


	