import { useState } from 'react';
import './RecipeMainPage.css';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';
import RecipeFilter from './RecipeFilter';
import Pagination from './Pagination'
import AideRapide from './AideRapide';

function RecipeMainPage() {
  const [recettes, setRecettes] = useState([
    {
      id: 1,
      image: "/image/Q.jpg",
      nom: "Quiche Lorraine",
      categorie: "Plat",
      ingredients: ["Pâte brisée", "Crème fraîche", "Lardons", "Oeufs"],
      difficulte: 2,
      description: "Une quiche classique de Lorraine, simple et délicieuse.",
      createdAt: new Date().toLocaleString()
    },
    {
      id: 2,
      image: "/image/tiramisu.webp",
      nom: "Tiramisu",
      categorie: "Dessert",
      ingredients: ["Mascarpone", "Oeufs", "Café", "Biscuits", "Cacao"],
      difficulte: 3,
      description: "Un dessert italien doux et crémeux.",
      createdAt: new Date().toLocaleString()
    },
    {
      id: 3,
      image: "/image/mojito.webp",
      nom: "Cocktail Mojito",
      categorie: "Boisson",
      ingredients: ["Menthe", "Citron vert", "Sucre", "Eau gazeuse", "Rhum"],
      difficulte: 1,
      description: "Une boisson rafraîchissante parfaite pour l'été.",
      createdAt: new Date().toLocaleString()
    }
  ]);

  const [recetteEnCours, setRecetteEnCours] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filteredRecettes, setFilteredRecettes] = useState(recettes);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;




  const modifierRecette = (id) => {
    const recette = recettes.find(r => r.id === id);
    setRecetteEnCours(recette);
    setShowForm(true);
  };

  const dupliquerRecette = (id) => {
    const recette = recettes.find(r => r.id === id);
    const nouvelleRecette = {
      ...recette,
      id: Math.max(...recettes.map(r => r.id)) + 1,
      nom: recette.nom + " (copie)",
      createdAt: new Date().toLocaleString()
    };

    const nouvellesRecettes = [...recettes, nouvelleRecette];
    setRecettes(nouvellesRecettes);
    setFilteredRecettes(nouvellesRecettes);
  };


  const supprimerRecette = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      const nouvellesRecettes = recettes.filter(r => r.id !== id);
      setRecettes(nouvellesRecettes);
      setFilteredRecettes(nouvellesRecettes);
    }
  };


  const enregistrerRecette = (recetteModifiee) => {
    setRecettes(recettes.map(r =>
      r.id === recetteModifiee.id ? recetteModifiee : r
    ));
    setShowForm(false);
    setRecetteEnCours(null);
  };

  const annulerModification = () => {
    setShowForm(false);
    setRecetteEnCours(null);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecettes = filteredRecettes.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="App">
      <div className="top-bar">
        <div><h1>Creative Recipe Builder </h1></div>
        <RecipeFilter recettes={recettes} onFilter={setFilteredRecettes} />
        <div style={{ padding: "20px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              setRecetteEnCours(null);
              setShowForm(true);
            }}
            className="btn-create"
          >
            + Créer une nouvelle recette
          </button>
        </div>
      </div>


      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
        {currentRecettes.map(r => (
          <RecipeItem
            key={r.id}
            recettes={r}
            modifierRecette={modifierRecette}
            dupliquerRecette={dupliquerRecette}
            supprimerRecette={supprimerRecette}
          />
        ))}

      </div>
      <AideRapide />



      {showForm && (
        <RecipeForm
          recette={recetteEnCours}
          enregistrer={(recetteModifiee) => {
            if (recetteEnCours) {

              enregistrerRecette(recetteModifiee);
            } else {

              setRecettes((prev) => [...prev, recetteModifiee]);
              setFilteredRecettes((prev) => [...prev, recetteModifiee]);
              setShowForm(false);

            }
          }}
          annuler={annulerModification}
        />
      )}

      <Pagination
        totalItems={filteredRecettes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />


    </div>
  );
}

export default RecipeMainPage;