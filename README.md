# Chatbot That Remembers You

An AI-powered chatbot designed to retain useful information from previous conversations and use it to provide more personalized responses.

Unlike a traditional chatbot that primarily relies on the current conversation context, this project explores persistent memory using structured fact extraction, vector embeddings, and semantic retrieval.

## Preview:
![Chatbot Application](screenshots/main-ui.png)

## Current Build Status:
![Build Status](https://github.com/WhoThisPerson/chatbot-that-remembers-you/actions/workflows/ci-build.yaml/badge.svg)

## Overview

The application uses an LLM to identify useful facts from user messages, converts those facts into vector embeddings, and stores them in a PostgreSQL database with pgvector.

When responding to future messages, the application can retrieve relevant stored memories through semantic similarity search and incorporate them into the chatbot's context.

## Planned Features

- **Fact Extraction:** Extract useful, structured information from user messages using an LLM.
- **Embedding Generation:** Convert extracted facts into vector embeddings for semantic retrieval.
- **Persistent Memory:** Store and manage user memories using PostgreSQL and pgvector.
- **Semantic Search:** Retrieve relevant memories based on the meaning of incoming messages.
- **Context-Aware Responses:** Incorporate retrieved memories into future chatbot responses.
- **Streaming Responses:** Stream generated responses to the user.

## Tech Stack

- TypeScript
- Next.js
- Vercel AI SDK
- PostgreSQL
- pgvector
- Drizzle ORM
- Zod
- Vitest
- Docker

## Project Status

Currently under development. Backend functionality, including AI-powered fact extraction, embedding generation, and database operations, is being implemented and tested. Frontend development and end-to-end integration are planned.

## Project Structure
TBA

## Running the Application

### Prerequisites

* Docker
* Docker Compose

### Start

Clone the repository and start the application:

```bash
git clone git@github.com:[YOUR GITHUB USERNAME]/chatbot-that-remembers-you.git
docker compose up -d
```

Run database migrations to create the development and testing database:

```bash
npm run db:migrate:dev
npm run db:migrate:test
```

The application will then be available at:

* Database: `http://localhost:5432`

### Stop

```bash
docker compose down -v
```

## Testing

Vitest is used to test AI and database functionality.
They are also executed in GitHub Actions.

Run the backend tests via:

```bash
npm run test
```

The testing environment expects PostgreSQL test configuration separate from the primary application database

## Motivation

Project was created to become familiar with AI development and workings behind AI usage.
