import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base, Recipe, RecipeCreate, RecipeUpdate
from typing import List, Optional

SQLITE_DATABASE_URL = "sqlite:///./recipes.db"

engine = create_engine(SQLITE_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_recipe(db: Session, recipe: RecipeCreate):
    db_recipe = Recipe(
        title=recipe.title,
        description=recipe.description,
        ingredients=json.dumps(recipe.ingredients),
        instructions=recipe.instructions,
        prep_time=recipe.prep_time,
        cook_time=recipe.cook_time,
        servings=recipe.servings,
        cuisine=recipe.cuisine,
        difficulty=recipe.difficulty
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def get_recipes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Recipe).offset(skip).limit(limit).all()

def get_recipe(db: Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()

def update_recipe(db: Session, recipe_id: int, recipe_update: RecipeUpdate):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe:
        update_data = recipe_update.model_dump(exclude_unset=True)
        if 'ingredients' in update_data:
            update_data['ingredients'] = json.dumps(update_data['ingredients'])
        for field, value in update_data.items():
            setattr(db_recipe, field, value)
        db.commit()
        db.refresh(db_recipe)
    return db_recipe

def delete_recipe(db: Session, recipe_id: int):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe:
        db.delete(db_recipe)
        db.commit()
    return db_recipe

def search_recipes(db: Session, query: str, cuisine: Optional[str] = None):
    search = db.query(Recipe)
    if query:
        search = search.filter(Recipe.title.contains(query) | Recipe.description.contains(query))
    if cuisine:
        search = search.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))
    return search.all()