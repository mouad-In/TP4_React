import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RecipeList from "./ComponentR/RecipeList";
import FavorisList from "./ComponentR/FavorisLis";
import ContentRecipe from "./ComponentR/ContentRecipe";
import SearchBar from "./ComponentR/SearchBar";

function App() {

  const [favorisEncours, setFavorisEncours] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);

  const handleFavorite = (recipe) => {
    if (!favorisEncours.find(r => r.idMeal === recipe.idMeal)) {
      setFavorisEncours(prev => [...prev, recipe]);
    } else {
      setFavorisEncours(prev => prev.filter(r => r.idMeal !== recipe.idMeal));
    }
  };

  return (
    <>
      <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Link to="/recipes">Recettes</Link>
        <Link to="/search">Recherche</Link>
        <Link to="/favoris">Favoris</Link>
      </nav>

      <Routes>
        <Route
          path="/recipes"
          element={
            <RecipeList
              recipes={recipes}
              setRecipes={setRecipes}
              favorisEncours={favorisEncours}
              favorite={handleFavorite}
            />
          }
        />
        <Route
          path="/search"
          element={<SearchBar
            recipe={recipes}
            onFilter={setFilteredRecipe}
            filteredRecipes={filteredRecipe}
            favorisEncours={favorisEncours}
            favorite={handleFavorite} />}
        />
        <Route
          path="/favoris"
          element={<FavorisList favorisEncours={favorisEncours} />}
        />
        <Route
          path="/content/:id"
          element={
            <ContentRecipe
              recipes={recipes}
              favoris={favorisEncours}
              favorite={handleFavorite}
            />
          }
        />
        <Route
          path="*"
          element={<p style={{ padding: "20px" }}>Page non trouvée</p>}
        />
      </Routes>
    </>
  );
}

export default App;
