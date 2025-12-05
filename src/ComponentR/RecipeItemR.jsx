import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function RecipeItemR({ recipe, favorite, favoris }) {
  return (
    <div className="recipe-card">
      <img className="recipe-img" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <p>{recipe.strCategory}</p>
      <button 
        onClick={favorite} 
        style={{ fontSize: "1.5em", border: "none", backgroundColor: "white" }}
      >
        {favoris ? "★" : "☆"}
      </button>
      <div>
        <Link to={`/content/${recipe.idMeal}`}>
          <button className="close-btn" >Voir détails</button>
        </Link>
      </div>
    </div>
  );
}
