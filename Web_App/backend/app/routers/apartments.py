import os
import uuid
from typing import List

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from psycopg2.extensions import connection

from app.database import get_db
from app.schemas.apartment import ApartmentOut
from app.security import get_current_user

router = APIRouter(prefix="/apartments", tags=["Apartments"])

UPLOAD_DIR = "uploads"


@router.get("", response_model=List[ApartmentOut])
def list_apartments(conn: connection = Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM apartments ORDER BY created_at DESC")
    apartments = cursor.fetchall()
    cursor.close()
    return apartments


@router.get("/{apartment_id}", response_model=ApartmentOut)
def get_apartment(apartment_id: int, conn: connection = Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM apartments WHERE id = %s", (apartment_id,))
    apartment = cursor.fetchone()
    cursor.close()
    
    if not apartment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Apartment not found")
    return apartment


@router.post("", response_model=ApartmentOut, status_code=status.HTTP_201_CREATED)
def create_apartment(
    city: str = Form(...),
    rooms: int = Form(...),
    area: float = Form(...),
    price: float = Form(...),
    renovated: bool = Form(False),
    garage: bool = Form(False),
    balcony: bool = Form(False),
    new_building: bool = Form(False),
    image: UploadFile = File(None),
    conn: connection = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    saved_image_path = None
    if image and image.filename:
        ext = os.path.splitext(image.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(image.file.read())
        saved_image_path = f"/uploads/{filename}"

    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO apartments (
            city, rooms, area, price, renovated, garage, balcony, new_building, image, owner_id
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        ) RETURNING *
        """,
        (
            city, rooms, area, price, renovated, garage, balcony, new_building, saved_image_path, current_user["id"]
        )
    )
    apartment = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    return apartment


@router.delete("/{apartment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_apartment(
    apartment_id: int,
    conn: connection = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM apartments WHERE id = %s", (apartment_id,))
    apartment = cursor.fetchone()
    
    if not apartment:
        cursor.close()
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Apartment not found")
        
    if apartment["owner_id"] != current_user["id"]:
        cursor.close()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own listings",
        )
        
    if apartment["image"]:
        filepath = apartment["image"].lstrip("/")
        if os.path.exists(filepath):
            os.remove(filepath)
            
    cursor.execute("DELETE FROM apartments WHERE id = %s", (apartment_id,))
    conn.commit()
    cursor.close()

