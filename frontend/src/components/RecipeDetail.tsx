import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose, onEdit }) => {
  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="recipe-meta">
          <span className="cuisine">{recipe.cuisine}</span>
          <span className="difficulty">{recipe.difficulty}</span>
          <span className="time">Prep: {recipe.prep_time}min | Cook: {recipe.cook_time}min</span>
          <span className="servings">Serves {recipe.servings}</span>
        </div>

        <p className="description">{recipe.description}</p>

        <div className="recipe-content">
          <div className="ingredients-section">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h3>Instructions</h3>
            <div className="instructions">
              {recipe.instructions.split('\n').map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="recipe-actions">
          <button onClick={() => onEdit(recipe)} className="btn-edit">Edit Recipe</button>
          <button onClick={onClose} className="btn-close">Close</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;