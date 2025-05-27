import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onEdit, onDelete }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p className="description">{recipe.description}</p>
      <div className="recipe-meta">
        <span className="cuisine">{recipe.cuisine}</span>
        <span className="difficulty">{recipe.difficulty}</span>
        <span className="time">{recipe.prep_time + recipe.cook_time} min</span>
        <span className="servings">{recipe.servings} servings</span>
      </div>
      <div className="recipe-actions">
        <button onClick={() => onView(recipe)} className="btn-view">View</button>
        <button onClick={() => onEdit(recipe)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(recipe.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default RecipeCard;