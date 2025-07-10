.PHONY: up down dev build test lint clean

# uv add <package>
# uv add --dev <package>

# uv run -- radon cc -s -a
# uv run -- radon mi src/ -s

# wily build .
# wily report <file>

# prospector src/api

setup: 
	curl -LsSf https://astral.sh/uv/install.sh | sh

	cd clients/shared && \
	pnpm install

	cd clients/apps/web && \
	pnpm install

	cd clients/apps/chrome && \
	pnpm install

	uv venv && \
	uv sync

	cd shared && \
	uv sync

	cd services/backend && \
	uv sync --dev

	docker compose up -d

	cd services/backend && \
	uv run alembic upgrade head

sdk:
	cd clients && \
	pnpm generate-api

# run services
backend:
	cd services/backend && \
	uv run -- uvicorn src.main:app --reload --host 0.0.0.0

transcription:
	source .venv/bin/activate && \
	cd services/transcription && \
	uv run -- python app/main.py

web:
	cd clients/apps/web && \
	pnpm run dev

chrome:
	cd clients/apps/chrome && \
	pnpm run dev

mobile:
	cd mobile && \
	pnpm run start


db-migrate:
	cd services/backend && \
	uv run alembic revision --autogenerate -m "message"

db-upgrade:
	cd services/backend && \
	uv run alembic upgrade head

db-downgrade:
	cd services/backend && \
	uv run alembic downgrade -1


mfix:
	cd mobile && \
	pnpm prebuild

mbuild:
	cd mobile && \
	eas build --platform ios --profile preview

fbuild:
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/frontend:latest -f docker/Dockerfile.frontend . && \
	docker push registry.braeden6.com/gtd/frontend:latest

bbuild:
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/backend:latest -f docker/Dockerfile.backend . && \
	docker push registry.braeden6.com/gtd/backend:latest

tbuild:
	docker build --platform linux/amd64 -t registry.braeden6.com/gtd/transcription:latest -f docker/Dockerfile.transcription . && \
	docker push registry.braeden6.com/gtd/transcription:latest

# scp <user>@<server>:/etc/rancher/k3s/k3s.yaml /path/to/save/k3s.yaml
# update the server ip
k9s:
	k9s --kubeconfig ../k3s.yaml


	