import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db, create_tables, create_recipe, get_recipes, get_recipe, update_recipe, delete_recipe, search_recipes
from models import RecipeCreate, RecipeResponse, RecipeUpdate

app = FastAPI(title="Recipe API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

def serialize_recipe(recipe):
    return RecipeResponse(
        id=recipe.id,
        title=recipe.title,
        description=recipe.description,
        ingredients=json.loads(recipe.ingredients) if recipe.ingredients else [],
        instructions=recipe.instructions,
        prep_time=recipe.prep_time,
        cook_time=recipe.cook_time,
        servings=recipe.servings,
        cuisine=recipe.cuisine,
        difficulty=recipe.difficulty,
        created_at=recipe.created_at
    )

@app.get("/")
def read_root():
    return {"message": "Recipe API is running!"}

@app.post("/recipes/", response_model=RecipeResponse)
def create_recipe_endpoint(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = create_recipe(db, recipe)
    return serialize_recipe(db_recipe)

@app.get("/recipes/", response_model=List[RecipeResponse])
def read_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = get_recipes(db, skip=skip, limit=limit)
    return [serialize_recipe(recipe) for recipe in recipes]

@app.get("/recipes/{recipe_id}", response_model=RecipeResponse)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return serialize_recipe(db_recipe)

@app.put("/recipes/{recipe_id}", response_model=RecipeResponse)
def update_recipe_endpoint(recipe_id: int, recipe: RecipeUpdate, db: Session = Depends(get_db)):
    db_recipe = update_recipe(db, recipe_id=recipe_id, recipe_update=recipe)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return serialize_recipe(db_recipe)

@app.delete("/recipes/{recipe_id}")
def delete_recipe_endpoint(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = delete_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"message": "Recipe deleted successfully"}

@app.get("/recipes/search/", response_model=List[RecipeResponse])
def search_recipes_endpoint(q: Optional[str] = None, cuisine: Optional[str] = None, db: Session = Depends(get_db)):
    recipes = search_recipes(db, query=q, cuisine=cuisine)
    return [serialize_recipe(recipe) for recipe in recipes]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)