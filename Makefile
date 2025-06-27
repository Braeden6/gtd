.PHONY: up down dev build test lint clean

# uv add <package>
# uv add --dev <package>

# uv run -- radon cc -s -a
# uv run -- radon mi src/ -s

# wily build .
# wily report <file>

# prospector src/api

setup: 
	cd clients && \
	pnpm install

	cd clients/shared && \
	pnpm install

	cd clients/apps/frontend && \
	pnpm install

	cd clients/apps/chrome && \
	pnpm install



# tech debt: fix setup
# cd frontend && \
# pnpm install && \
# cd ../ && \
# uv venv && \
# uv sync && \
# cd shared && \
# uv sync && \
# cd ../services/transcription && \
# uv sync && \
# cd ../backend && \
# uv sync --dev

sdk:
	cd clients && \
	pnpm generate-api

# run services
backend:
	source .venv/bin/activate && \
	cd services/backend && \
	uv run -- uvicorn src.main:app --reload --host 0.0.0.0

transcription:
	source .venv/bin/activate && \
	cd services/transcription && \
	uv run -- python app/main.py

# make sure to run this for hot reloading on shared components
shared:
	cd clients/shared && \
	pnpm run dev

frontend:
	cd clients/apps/frontend && \
	pnpm run dev

chrome:
	cd clients/apps/chrome && \
	pnpm run dev

mobile:
	cd mobile && \
	pnpm run start





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


	