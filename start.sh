#!/bin/bash

# React başlat
cd frontend
npm start &

# FastAPI başlat
cd ../backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 5000
