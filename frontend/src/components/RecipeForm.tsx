import React, { useState, useEffect } from 'react';
import { Recipe, RecipeCreate } from '../types/Recipe';

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (recipe: RecipeCreate) => void;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<RecipeCreate>({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    prep_time: 0,
    cook_time: 0,
    servings: 1,
    cuisine: '',
    difficulty: 'Easy'
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty
      });
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  return (
    <div className="recipe-form-overlay">
      <div className="recipe-form">
        <h2>{recipe ? 'Edit Recipe' : 'Create New Recipe'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredients:</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-input">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="Enter ingredient"
                />
                <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={addIngredient}>Add Ingredient</button>
          </div>

          <div className="form-group">
            <label>Instructions:</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prep Time (min):</label>
              <input
                type="number"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: parseInt(e.target.value) })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Cook Time (min):</label>
              <input
                type="number"
                value={formData.cook_time}
                onChange={(e) => setFormData({ ...formData, cook_time: parseInt(e.target.value) })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Servings:</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) })}
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cuisine:</label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                placeholder="e.g., Italian, Mexican"
              />
            </div>

            <div className="form-group">
              <label>Difficulty:</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {recipe ? 'Update Recipe' : 'Create Recipe'}
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;