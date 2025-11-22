import React, { useState } from "react";
import "./RecipeForm.css";

export default function RecipeForm({ recette, enregistrer, annuler }) {
  const [ingredients, setIngredients] = useState(
    recette?.ingredients || [""] 
  );

  const [formData, setFormData] = useState({
    id: recette?.id || Date.now(),
    nom: recette?.nom || "",
    categorie: recette?.categorie || "Plat",
    difficulte: recette?.difficulte || 2,
    description: recette?.description || "",
    image: recette?.image || null,
    createdAt: recette?.createdAt || new Date().toISOString(),
  });

  const updateIngredient = (index, value) => {
    const copy = [...ingredients];
    copy[index] = value;
    setIngredients(copy);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      difficulte: parseInt(formData.difficulte),
      ingredients: ingredients.filter((i) => i.trim() !== ""),
    };

    enregistrer(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h1>{recette ? "Modifier la recette" : "Nouvelle recette"}</h1>
          <button className="close-btn" onClick={annuler}>
            Fermer
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Ex: Pancakes maison"
              required
            />
          </div>

        
          <div className="form-group">
            <label>Catégorie</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
            >
              <option value="Entrée">Entrée</option>
              <option value="Plat">Plat</option>
              <option value="Dessert">Dessert</option>
              <option value="Boisson">Boisson</option>
            </select>
          </div>

         
          <div className="form-group">
            <label>Ingrédients</label>

            {ingredients.map((ing, index) => (
              <div className="ingredient-row" key={index}>
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingrédient ${index + 1}`}
                />
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => removeIngredient(index)}
                >
                  Suppr
                </button>
              </div>
            ))}

            <button type="button" className="btn-add" onClick={addIngredient}>
              + Ajouter ingrédient
            </button>
          </div>

          <div className="form-group">
            <label>
              Difficulté :{" "}
              <span className="difficulty-value">{formData.difficulte}</span>
            </label>

            <input
              type="range"
              min="1"
              max="5"
              name="difficulte"
              value={formData.difficulte}
              onChange={handleChange}
            />
          </div>

        
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez la recette..."
              required
            ></textarea>
          </div>

       
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </div>

        
          <div className="form-buttons">
            <button className="btn-save" type="submit">
              Enregistrer
            </button>

            <button type="button" className="btn-cancel" onClick={annuler}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
