import psycopg2
from psycopg2.extras import RealDictCursor

from app.config import settings

def get_db():
    conn = psycopg2.connect(settings.DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    conn = psycopg2.connect(settings.DATABASE_URL)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            hashed_password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS apartments (
            id SERIAL PRIMARY KEY,
            city VARCHAR(100) NOT NULL,
            rooms INTEGER NOT NULL,
            area FLOAT NOT NULL,
            price FLOAT NOT NULL,
            renovated BOOLEAN DEFAULT FALSE,
            garage BOOLEAN DEFAULT FALSE,
            balcony BOOLEAN DEFAULT FALSE,
            new_building BOOLEAN DEFAULT FALSE,
            image TEXT,
            owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    conn.commit()
    cursor.close()
    conn.close()
