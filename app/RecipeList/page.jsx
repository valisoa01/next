'use client';
import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/RecipeList.module.css';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/data/recipes.json');

        if (!response.ok) {
          throw new Error(`Fichier non trouvé (Status ${response.status}). Vérifiez que public/data/recipes.json existe.`);
        }

        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length === 0) return;
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [query, recipes]);

  const handleSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  if (loading) {
    return <div className={styles.loading}>Chargement des recettes...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        <p><strong>Solution :</strong> Placez le fichier dans <code>public/data/recipes.json</code></p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mon Livre de Recettes</h1>
      </header>

      <main className={styles.main}>
        <input
          type="text"
          placeholder="Rechercher une recette..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {filteredRecipes.length === 0 && query && (
          <p>Aucune recette trouvée pour "{query}"</p>
        )}

        <ul className={styles.list}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={handleSelect}
            />
          ))}
        </ul>

         {selectedRecipe && (
          <div className={styles.overlay}>
            <div className={styles.details}>
              <button onClick={() => setSelectedRecipe(null)}>✕ Fermer</button>
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name}
                style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
              />
              <h2>{selectedRecipe.name}</h2>
              <p><strong>Catégorie :</strong> {selectedRecipe.category}</p>
              <p><strong>Durée :</strong> {selectedRecipe.duration} minutes</p>

              <h3>Ingrédients</h3>
              <ul>
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i}>• {ing}</li>
                ))}
              </ul>

              <h3>Étapes</h3>
              <ol>
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}