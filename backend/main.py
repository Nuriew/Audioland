import os
import uuid
import subprocess
from urllib.parse import urlparse

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app = FastAPI()

app.mount("/", StaticFiles(directory="static", html=True), name="static")
@app.get("/")
def read_index():
    return FileResponse("static/index.html")

# Rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"message": "Çok fazla istek gönderdiniz. Lütfen sonra tekrar deneyin."})

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model
class VideoURL(BaseModel):
    url: str

# Dosya klasörü
DOWNLOAD_DIR = "downloads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)
app.mount("/downloads", StaticFiles(directory=DOWNLOAD_DIR), name="downloads")

# ✅ Güvenli domain kontrol fonksiyonu
def is_valid_url(url: str, allowed_domains: list):
    try:
        parsed = urlparse(url)
        return any(domain in parsed.netloc for domain in allowed_domains)
    except Exception:
        return False

# 🎯 Ortak indirme fonksiyonu
async def process_download(url: str, platform: str):
    # Uygun domain listeleri
    domain_map = {
        "instagram": ["instagram.com"],
        "tiktok": ["tiktok.com"],
        "youtube": ["youtube.com", "youtu.be"],
        "pinterest": ["pinterest.com", "pin.it"]
    }

    if not is_valid_url(url, domain_map[platform]):
        raise HTTPException(status_code=400, detail=f"Geçersiz {platform} URL'si")

    unique_id = str(uuid.uuid4())
    output_template = os.path.join(DOWNLOAD_DIR, unique_id + ".%(ext)s")

    command = [
        "yt-dlp",
        "-x", "--audio-format", "mp3",
        "-o", output_template,
        url
    ]

    subprocess.run(command, check=True)
    mp3_file = os.path.join(DOWNLOAD_DIR, f"{unique_id}.mp3")

    if os.path.exists(mp3_file):
        return {"audioUrl": f"http://173.249.60.195:5000/download-file/{unique_id}.mp3"}
    else:
        raise HTTPException(status_code=500, detail=".mp3 dosyası oluşturulamadı")

# 📥 Tüm platformlar için endpoint’ler
@app.post("/api/instagram")
@limiter.limit("5/minute")
async def download_instagram(data: VideoURL, request: Request):
    return await process_download(data.url, "instagram")

@app.post("/api/tiktok")
@limiter.limit("5/minute")
async def download_tiktok(data: VideoURL, request: Request):
    return await process_download(data.url, "tiktok")

@app.post("/api/youtube")
@limiter.limit("5/minute")
async def download_youtube(data: VideoURL, request: Request):
    return await process_download(data.url, "youtube")

@app.post("/api/pinterest")
@limiter.limit("5/minute")
async def download_pinterest(data: VideoURL, request: Request):
    return await process_download(data.url, "pinterest")

# 🧲 Dosya indirme
@app.get("/download-file/{filename}")
def download_file(filename: str):
    file_path = os.path.join(DOWNLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Dosya bulunamadı")

    return FileResponse(
        path=file_path,
        media_type="audio/mpeg",
        filename=filename,
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
