import { useState } from "react";
import RecipeItemR from "./RecipeItemR";
import './style.css';

function SearchBar({ recipe = [], onFilter, filteredRecipes = [], favorisEncours = [], favorite }) {
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchClick = () => {
        if (search.trim().length < 3) {
            setMessage("La zone de recherche doit contenir au moins 3 caractères");
            return;
        }

        setMessage("");
        setLoading(true);

        setTimeout(() => {
            const filtered = recipe.filter(r =>
                r.strMeal.toLowerCase().includes(search.toLowerCase())
            );
            onFilter(filtered);
            setLoading(false);
        }, 300); 
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div>
            <div className="search-bar-container">
                <input
                    className="search-input"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Rechercher une recette..."
                />

                <button
                    className="search-btn"
                    onClick={handleSearchClick}
                    disabled={loading}
                >
                    {loading ? "Recherche..." : "Rechercher"}
                </button>

                {message && (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                        {message}
                    </span>
                )}


            </div>
            <div style={{ marginTop: "10px" }}>
                {filteredRecipes.length} recette(s) trouvée(s)
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
                {filteredRecipes.length > 0 ? filteredRecipes.map(r => (
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

export default SearchBar;
