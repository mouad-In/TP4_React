import { useState } from "react";
import "./RecipeFilter.css";

export default function RecipeFilter(props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', ...new Set(props.recettes.map(r => r.categorie))];

  const handleFilter = (newSearch, newCategory) => {
    let filtered = props.recettes;

    if (newSearch.trim() !== '') {
      filtered = filtered.filter(r =>
        r.nom.toLowerCase().includes(newSearch.toLowerCase())
      );
    }

    if (newCategory !== 'Tous') {
      filtered = filtered.filter(r => r.categorie === newCategory);
    }

    props.onFilter(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleFilter(value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    handleFilter(search, value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={handleSearchChange}
        className="filter-search"
      />

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="filter-select"
      >
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
