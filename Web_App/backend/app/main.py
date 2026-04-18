import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import init_db
from app.routers import auth, apartments

os.makedirs("uploads", exist_ok=True)

init_db()

app = FastAPI(
    title="Apartment Marketplace API",
    description="REST API for apartment marketplace — auth, listings CRUD.",
    version="1.0.0",
)


app.include_router(auth.router)
app.include_router(apartments.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")