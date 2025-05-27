# Recipe Collection Web App

A full-stack recipe management application with a FastAPI backend and React TypeScript frontend.

## Features

- 📝 Create, read, update, and delete recipes
- 🔍 Search recipes by title, description, or cuisine
- 🏷️ Filter recipes by cuisine type
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations

## Tech Stack

**Backend:**
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- SQLite (Database)
- Pydantic (Data validation)

**Frontend:**
- React with TypeScript
- Axios (HTTP client)
- CSS Grid & Flexbox
- Responsive design

## Project Structure

```
coder-demo/
├── backend/
│   ├── main.py           # FastAPI app and routes
│   ├── models.py         # Database models and Pydantic schemas
│   ├── database.py       # Database connection and CRUD operations
│   ├── seed_data.py      # Sample data for testing
│   ├── start.sh          # Backend startup script
│   └── recipes.db        # SQLite database (created automatically)
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── types/        # TypeScript interfaces
    │   ├── api/          # API client functions
    │   └── App.tsx       # Main app component
    └── public/           # Static assets
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the backend server (this will auto-create venv and install dependencies):
   ```bash
   ./start.sh
   ```
   
   Or set up manually:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   pip install fastapi uvicorn sqlalchemy pydantic python-multipart
   python seed_data.py  # Add sample data
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`
- API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `GET /recipes/` - Get all recipes
- `POST /recipes/` - Create a new recipe
- `GET /recipes/{id}` - Get a specific recipe
- `PUT /recipes/{id}` - Update a recipe
- `DELETE /recipes/{id}` - Delete a recipe
- `GET /recipes/search/` - Search recipes with query parameters

## Usage

1. **View Recipes**: The main page displays all recipes in a card layout
2. **Add Recipe**: Click "Add New Recipe" to create a new recipe
3. **Search**: Use the search bar to find recipes by title or description
4. **Filter**: Select a cuisine type to filter recipes
5. **View Details**: Click "View" on any recipe card to see full details
6. **Edit Recipe**: Click "Edit" to modify a recipe
7. **Delete Recipe**: Click "Delete" to remove a recipe (with confirmation)

## Sample Data

The app comes with 5 sample recipes:
- Classic Spaghetti Carbonara (Italian)
- Chicken Tikka Masala (Indian)
- Chocolate Chip Cookies (American)
- Thai Green Curry (Thai)
- Caesar Salad (American)

## Development

- Backend runs on port 8000 with auto-reload enabled
- Frontend runs on port 3000 with hot reloading
- CORS is configured to allow frontend-backend communication

## Future Enhancements

- User authentication and personal recipe collections
- Recipe ratings and reviews
- Image upload for recipes
- Recipe sharing and social features
- Advanced search with ingredients
- Meal planning and shopping lists
- Recipe import from URLs
