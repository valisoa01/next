'use client';
import { useState } from 'react';
import style from '../styles/RecipeCard.module.css';

export default function RecipeCard({ recipe, onSelect }) {
  const [pinned, setPinned] = useState(false);

  const handleClick = () => {
    onSelect(recipe);
  };

  const handlePinClick = (e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking pin
    setPinned((prev) => !prev);
  };

  return (
    <article 
      className={`${style.card} ${pinned ? style.pinned : ''}`} 
      onClick={handleClick}
    >
      <img 
        className={style.image} 
        src={recipe.image} 
        alt={recipe.name} 
      />
      <div className={style.body}>
        <h2 className={style.name}>{recipe.name}</h2>
        <span className={style.badge}>{recipe.category}</span>
        <p className={style.duration}>{recipe.duration} min</p>

        <button
          type="button"
          className={style.pin}
          onClick={handlePinClick}
        >
          {pinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
    </article>
  );
}