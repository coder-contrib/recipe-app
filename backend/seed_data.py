import json
from sqlalchemy.orm import Session
from database import SessionLocal, create_tables
from models import Recipe

def create_sample_recipes():
    db = SessionLocal()
    
    sample_recipes = [
        {
            "title": "Classic Spaghetti Carbonara",
            "description": "A traditional Italian pasta dish with eggs, cheese, and pancetta",
            "ingredients": json.dumps([
                "400g spaghetti",
                "200g guanciale or pancetta",
                "4 large eggs",
                "100g Pecorino Romano cheese, grated",
                "Black pepper to taste",
                "Salt for pasta water"
            ]),
            "instructions": "1. Cook spaghetti in salted boiling water until al dente.\n2. Meanwhile, dice and cook guanciale until crispy.\n3. Beat eggs with grated cheese and black pepper.\n4. Drain pasta, reserving pasta water.\n5. Toss hot pasta with guanciale and fat.\n6. Remove from heat and quickly mix in egg mixture.\n7. Add pasta water if needed for creaminess.\n8. Serve immediately with more cheese and pepper.",
            "prep_time": 10,
            "cook_time": 15,
            "servings": 4,
            "cuisine": "Italian",
            "difficulty": "Medium"
        },
        {
            "title": "Chicken Tikka Masala",
            "description": "Creamy tomato-based curry with marinated grilled chicken",
            "ingredients": json.dumps([
                "500g chicken breast, cubed",
                "1 cup plain yogurt",
                "2 tbsp tikka masala spice blend",
                "1 onion, diced",
                "3 cloves garlic, minced",
                "1 inch ginger, grated",
                "400ml coconut milk",
                "400g canned tomatoes",
                "2 tbsp tomato paste",
                "Fresh cilantro for garnish"
            ]),
            "instructions": "1. Marinate chicken in yogurt and half the spices for 30 minutes.\n2. Grill or pan-fry chicken until cooked through.\n3. Sauté onion, garlic, and ginger until fragrant.\n4. Add remaining spices and tomato paste, cook 1 minute.\n5. Add canned tomatoes and coconut milk.\n6. Simmer for 15 minutes until thickened.\n7. Add cooked chicken and simmer 5 more minutes.\n8. Garnish with cilantro and serve with rice.",
            "prep_time": 45,
            "cook_time": 30,
            "servings": 4,
            "cuisine": "Indian",
            "difficulty": "Medium"
        },
        {
            "title": "Chocolate Chip Cookies",
            "description": "Classic homemade cookies with gooey chocolate chips",
            "ingredients": json.dumps([
                "2¼ cups all-purpose flour",
                "1 tsp baking soda",
                "1 tsp salt",
                "1 cup butter, softened",
                "¾ cup granulated sugar",
                "¾ cup brown sugar",
                "2 large eggs",
                "2 tsp vanilla extract",
                "2 cups chocolate chips"
            ]),
            "instructions": "1. Preheat oven to 375°F (190°C).\n2. Mix flour, baking soda, and salt in a bowl.\n3. Cream butter and both sugars until fluffy.\n4. Beat in eggs and vanilla.\n5. Gradually blend in flour mixture.\n6. Stir in chocolate chips.\n7. Drop rounded tablespoons onto ungreased cookie sheets.\n8. Bake 9-11 minutes until golden brown.\n9. Cool on baking sheet for 2 minutes before removing.",
            "prep_time": 15,
            "cook_time": 11,
            "servings": 24,
            "cuisine": "American",
            "difficulty": "Easy"
        },
        {
            "title": "Thai Green Curry",
            "description": "Spicy and aromatic Thai curry with coconut milk and vegetables",
            "ingredients": json.dumps([
                "2 tbsp green curry paste",
                "400ml coconut milk",
                "300g chicken thigh, sliced",
                "1 eggplant, cubed",
                "100g green beans",
                "2 bell peppers, sliced",
                "2 tbsp fish sauce",
                "1 tbsp palm sugar",
                "Thai basil leaves",
                "Lime juice to taste"
            ]),
            "instructions": "1. Heat 2 tbsp coconut milk in a wok over medium heat.\n2. Add curry paste and fry until fragrant.\n3. Add chicken and cook until done.\n4. Pour in remaining coconut milk.\n5. Add eggplant and green beans, simmer 10 minutes.\n6. Add bell peppers, fish sauce, and palm sugar.\n7. Cook until vegetables are tender.\n8. Stir in basil leaves and lime juice.\n9. Serve with jasmine rice.",
            "prep_time": 20,
            "cook_time": 25,
            "servings": 4,
            "cuisine": "Thai",
            "difficulty": "Medium"
        },
        {
            "title": "Caesar Salad",
            "description": "Crisp romaine lettuce with homemade Caesar dressing and croutons",
            "ingredients": json.dumps([
                "2 heads romaine lettuce",
                "½ cup mayonnaise",
                "2 tbsp lemon juice",
                "2 cloves garlic, minced",
                "1 tsp Worcestershire sauce",
                "½ cup Parmesan cheese, grated",
                "2 cups bread cubes",
                "3 tbsp olive oil",
                "Salt and pepper to taste"
            ]),
            "instructions": "1. Wash and chop romaine lettuce.\n2. For croutons, toss bread cubes with olive oil and seasonings.\n3. Bake at 375°F for 10-15 minutes until golden.\n4. For dressing, whisk together mayonnaise, lemon juice, garlic, and Worcestershire.\n5. Season dressing with salt and pepper.\n6. Toss lettuce with dressing.\n7. Top with Parmesan cheese and croutons.\n8. Serve immediately.",
            "prep_time": 15,
            "cook_time": 15,
            "servings": 4,
            "cuisine": "American",
            "difficulty": "Easy"
        }
    ]
    
    for recipe_data in sample_recipes:
        recipe = Recipe(**recipe_data)
        db.add(recipe)
    
    db.commit()
    db.close()
    print("Sample recipes added successfully!")

if __name__ == "__main__":
    create_tables()
    create_sample_recipes()