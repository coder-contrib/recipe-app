import axios from 'axios';
import { Recipe, RecipeCreate } from '../types/Recipe';

// Use same host as frontend, but port 8000 for API
const getApiBaseUrl = () => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:8000`;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const recipeApi = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    const response = await api.get('/recipes/');
    return response.data;
  },

  getRecipe: async (id: number): Promise<Recipe> => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  createRecipe: async (recipe: RecipeCreate): Promise<Recipe> => {
    const response = await api.post('/recipes/', recipe);
    return response.data;
  },

  updateRecipe: async (id: number, recipe: Partial<RecipeCreate>): Promise<Recipe> => {
    const response = await api.put(`/recipes/${id}`, recipe);
    return response.data;
  },

  deleteRecipe: async (id: number): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },

  searchRecipes: async (query?: string, cuisine?: string): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (cuisine) params.append('cuisine', cuisine);
    
    const response = await api.get(`/recipes/search/?${params.toString()}`);
    return response.data;
  }
};