export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  cuisine: string;
  difficulty: string;
  created_at: string;
}

export interface RecipeCreate {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  cuisine: string;
  difficulty: string;
}