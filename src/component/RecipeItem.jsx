function RecipeItem(props) {

  const recette = props.recettes;
  const renderDifficulty = (level) => {
    return "🔥".repeat(level);
  };

  return (
    <div className="recipe-card">
      <img className="recipe-img" src={recette.image} alt={recette.nom} />

      <div className="recipe-content">

        <div className="recipe-header">
          <h3>{recette.nom}</h3>
          <span className="categorie-badge">{recette.categorie}</span>
        </div>

        <p className="recipe-desc">{recette.description}</p>

        <div className="ingredient-list">
          {recette.ingredients.map((ing, index) => (
            <span key={index} className="ingredient-badge">{ing}</span>
          ))}
        </div>

        <p className="difficulty">
          <strong>Difficulté :</strong> {renderDifficulty(recette.difficulte)}
        </p>

        <p className="date">
          <strong>Créée :</strong> {recette.createdAt}
        </p>

        <div className="recipe-buttons">
          <button className="btn edit" onClick={() => props.modifierRecette(recette.id)}>Modifier</button>
          <button className="btn duplicate" onClick={() => props.dupliquerRecette(recette.id)}>Dupliquer</button>
          <button className="btn delete" onClick={() => props.supprimerRecette(recette.id)}>Supprimer</button>
        </div>

      </div>
    </div>
  );
}

export default RecipeItem;
