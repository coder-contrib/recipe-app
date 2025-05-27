import React, { useState, useEffect } from 'react';
import { Recipe, RecipeCreate } from './types/Recipe';
import { recipeApi } from './api/recipeApi';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeApi.getAllRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Make sure the backend is running.');
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (recipeData: RecipeCreate) => {
    try {
      const newRecipe = await recipeApi.createRecipe(recipeData);
      setRecipes([newRecipe, ...recipes]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create recipe');
      console.error('Error creating recipe:', err);
    }
  };

  const handleUpdateRecipe = async (recipeData: RecipeCreate) => {
    if (!editingRecipe) return;
    
    try {
      const updatedRecipe = await recipeApi.updateRecipe(editingRecipe.id, recipeData);
      setRecipes(recipes.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
      setEditingRecipe(null);
      setSelectedRecipe(updatedRecipe);
      setError(null);
    } catch (err) {
      setError('Failed to update recipe');
      console.error('Error updating recipe:', err);
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await recipeApi.deleteRecipe(id);
      setRecipes(recipes.filter(r => r.id !== id));
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete recipe');
      console.error('Error deleting recipe:', err);
    }
  };

  const handleSearch = async (query: string, cuisine: string) => {
    try {
      setLoading(true);
      if (!query && !cuisine) {
        await loadRecipes();
      } else {
        const searchResults = await recipeApi.searchRecipes(query, cuisine);
        setRecipes(searchResults);
      }
      setError(null);
    } catch (err) {
      setError('Failed to search recipes');
      console.error('Error searching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setSelectedRecipe(null);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  if (loading && recipes.length === 0) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Recipe Collection</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-add-recipe"
        >
          Add New Recipe
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <SearchBar onSearch={handleSearch} />

      <main className="recipes-container">
        {recipes.length === 0 ? (
          <div className="no-recipes">
            <p>No recipes found. Start by adding your first recipe!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={handleViewRecipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <RecipeForm
          onSubmit={handleCreateRecipe}
          onCancel={handleCloseForm}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={handleUpdateRecipe}
          onCancel={handleCloseForm}
        />
      )}

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={handleCloseDetail}
          onEdit={handleEditRecipe}
        />
      )}
    </div>
  );
}

export default App;
