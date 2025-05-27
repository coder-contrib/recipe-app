from sqlalchemy import Column, Integer, String, Text, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

Base = declarative_base()

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    ingredients = Column(Text)  # JSON string
    instructions = Column(Text)
    prep_time = Column(Integer)  # minutes
    cook_time = Column(Integer)  # minutes
    servings = Column(Integer)
    cuisine = Column(String)
    difficulty = Column(String)  # Easy, Medium, Hard
    created_at = Column(DateTime, default=datetime.utcnow)

class RecipeCreate(BaseModel):
    title: str
    description: str
    ingredients: List[str]
    instructions: str
    prep_time: int
    cook_time: int
    servings: int
    cuisine: str
    difficulty: str

class RecipeResponse(BaseModel):
    id: int
    title: str
    description: str
    ingredients: List[str]
    instructions: str
    prep_time: int
    cook_time: int
    servings: int
    cuisine: str
    difficulty: str
    created_at: datetime

    class Config:
        from_attributes = True

class RecipeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    ingredients: Optional[List[str]] = None
    instructions: Optional[str] = None
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    cuisine: Optional[str] = None
    difficulty: Optional[str] = None