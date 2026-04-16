import os
import uuid
from typing import List

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.apartment import Apartment
from app.models.user import User
from app.schemas.apartment import ApartmentOut
from app.security import get_current_user

router = APIRouter(prefix="/apartments", tags=["Apartments"])

UPLOAD_DIR = "uploads"


@router.get("", response_model=List[ApartmentOut])
def list_apartments(db: Session = Depends(get_db)):
    return db.query(Apartment).order_by(Apartment.created_at.desc()).all()


@router.get("/{apartment_id}", response_model=ApartmentOut)
def get_apartment(apartment_id: int, db: Session = Depends(get_db)):
    apartment = db.query(Apartment).filter(Apartment.id == apartment_id).first()
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image_url = None
    if image and image.filename:
        ext = os.path.splitext(image.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(image.file.read())
        image_url = f"/uploads/{filename}"

    apartment = Apartment(
        city=city,
        rooms=rooms,
        area=area,
        price=price,
        renovated=renovated,
        garage=garage,
        balcony=balcony,
        new_building=new_building,
        image_url=image_url,
        owner_id=current_user.id,
    )
    db.add(apartment)
    db.commit()
    db.refresh(apartment)
    return apartment


@router.delete("/{apartment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_apartment(
    apartment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    apartment = db.query(Apartment).filter(Apartment.id == apartment_id).first()
    if not apartment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Apartment not found")
    if apartment.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own listings",
        )
    if apartment.image_url:
        filepath = apartment.image_url.lstrip("/")
        if os.path.exists(filepath):
            os.remove(filepath)
    db.delete(apartment)
    db.commit()
