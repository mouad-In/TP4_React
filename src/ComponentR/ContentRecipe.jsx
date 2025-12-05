import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

function ContentRecipe({ recipes, favorite, favoris }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes?.find(r => String(r.idMeal) === String(id));
  if (!recipe) return <p>Recette non trouvée</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  const isFavoris = favoris?.some(f => f.idMeal === recipe.idMeal);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>{recipe.strMeal}</h3>
        <p><strong>Région:</strong> {recipe.strArea}</p>
        <p><strong>Catégorie:</strong> {recipe.strCategory}</p>

        <div style={{ margin: "15px 0" }}>
          <button 
            className="close-btn"
            style={{ backgroundColor: isFavoris ? "#ffd700" : "#f3f3f3" }}
            onClick={() => favorite(recipe)}
          >
            {isFavoris ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
          </button>
          <button className="close-btn" onClick={() => navigate(-1)}>Fermer</button>
        </div>

        <h3>Ingrédients</h3>
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>{item.measure} {item.ingredient}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
      </div>
    </div>
  );
}

export default ContentRecipe;
