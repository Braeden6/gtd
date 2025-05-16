.PHONY: up down dev build test lint clean

setup: 
	cd frontend && \
	pnpm install && \
	cd ../ && \
	uv venv && \
	source .venv/bin/activate && \
	cd shared && \
	uv pip install -e . && \
	cd ../services/transcription && \
	uv pip install -e . && \
	cd ../backend && \
	uv pip install -e . #'.[dev]'


b:
	source .venv/bin/activate && \
	cd services/backend && \
	uvicorn src.main:app --reload --host 0.0.0.0

db-migrate:
	source .venv/bin/activate && \
	cd services/backend && \
	alembic revision --autogenerate -m "message"

db-upgrade:
	source .venv/bin/activate && \
	cd services/backend && \
	alembic upgrade head

db-downgrade:
	source .venv/bin/activate && \
	cd services/backend && \
	alembic downgrade -1

t:
	source .venv/bin/activate && \
	cd services/transcription && \
	python app/main.py

f:
	cd frontend && \
	pnpm run dev

m:
	cd mobile && \
	pnpm run start

mfix:
	cd mobile && \
	pnpm prebuild

sdk:
	cd frontend && \
	pnpm generate-api && \
	pnpm generate-api-mobile

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


	