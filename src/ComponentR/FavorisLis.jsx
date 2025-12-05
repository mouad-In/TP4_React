import React from "react";
import "./style.css";

function FavorisList({ favorisEncours }) {
  if (!favorisEncours || favorisEncours.length === 0) return <p>Aucun favori pour le moment.</p>;

  return (
    <div className="favoris-container">
      {favorisEncours.map(r => (
        <div key={r.idMeal} className="favoris-item">
          <img className="recipe-img" src={r.strMealThumb} alt={r.strMeal}/>
          <h3>{r.strMeal}</h3>
          <p>{r.strCategory}</p>
        </div>
      ))}
    </div>
  );
}

export default FavorisList;
