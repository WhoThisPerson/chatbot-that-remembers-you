CREATE DATABASE chatbot_test;

\connect chatbot_dev
CREATE EXTENSION IF NOT EXISTS vector;

\connect chatbot_test
CREATE EXTENSION IF NOT EXISTS vector;
