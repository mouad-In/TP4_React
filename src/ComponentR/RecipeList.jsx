import React, { useEffect, useState } from "react";
import RecipeItemR from "./RecipeItemR";

function RecipeList({ setRecipes, favorisEncours, favorite }) {
    const [recipes, setLocalRecipes] = useState([]); 

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=potato")
            .then(res => res.json())
            .then(data => {
                setRecipes(data.meals || []); 
                setLocalRecipes(data.meals || []); 
            });
    }, [setRecipes]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Recherche de recettes</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
                {recipes.length > 0 ? recipes.map(r => (
                    <RecipeItemR
                        key={r.idMeal}
                        recipe={r}
                        favoris={favorisEncours.some(f => f.idMeal === r.idMeal)}
                        favorite={() => favorite(r)}
                        
                    />
                )) : <p style={{ color: "red" }}>Aucune recette trouvée</p>}
            </div>
        </div>
    );
}

export default RecipeList;
