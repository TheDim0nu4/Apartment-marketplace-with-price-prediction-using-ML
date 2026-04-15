from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ApartmentCreate(BaseModel):
    city: str
    rooms: int
    area: float
    price: float
    renovated: bool = False
    garage: bool = False
    balcony: bool = False
    new_building: bool = False
    image_url: Optional[str] = None


class ApartmentOut(BaseModel):
    id: int
    city: str
    rooms: int
    area: float
    price: float
    renovated: bool
    garage: bool
    balcony: bool
    new_building: bool
    image_url: Optional[str]
    owner_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
