#!/bin/bash

# React başlat
cd frontend
npm build run &

# FastAPI başlat
cd ../backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 5000
