#!/bin/bash

# Script bir hata alırsa durdur
set -e

# React build
cd frontend
npm install
npm run build

# FastAPI başlat
cd ../backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 5000
