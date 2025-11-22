import "./AideRapide.css";

export default function AideRapide() {
  return (
    <div className="aide-rapide-container">
      <div className="aide-rapide-card">
        
        <div className="aide-rapide-header">
          <h3 className="aide-rapide-title">Aide rapide</h3>
          <span className="aide-rapide-version">v1.0</span>
        </div>

        <ul className="aide-rapide-list">
          <li>
            • Cliquez sur <b>Créer une nouvelle recette</b> pour ouvrir le formulaire.
          </li>
          <li>
            • Pagination numérotée en bas de la liste.
          </li>
        </ul>

      </div>
    </div>
  );
}
