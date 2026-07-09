# Docker CLI App

## Description
This is a simple Node.js CLI application containerized using Docker. It also uses Docker Compose to run the application with a PostgreSQL database.

## Project Structure

```
docker-cli-app/
├── app.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
└── README.md
```

## Prerequisites

- Docker Desktop
- Node.js (for local testing)

## Run the application

```bash
docker compose up --build
```

## Stop the application

```bash
docker compose down
```

## Expected Output

```
Hello from Docker!
```

## Technologies Used

- Node.js
- Docker
- Docker Compose
- PostgreSQL
