from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Apartment(Base):
    __tablename__ = "apartments"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String(100), nullable=False)
    rooms = Column(Integer, nullable=False)
    area = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    renovated = Column(Boolean, default=False)
    garage = Column(Boolean, default=False)
    balcony = Column(Boolean, default=False)
    new_building = Column(Boolean, default=False)
    image_url = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="apartments")
