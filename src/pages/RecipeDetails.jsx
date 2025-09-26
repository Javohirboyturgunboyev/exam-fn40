import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch((err) => console.error("API error:", err));

    fetch("http://localhost:5001/recipes")
      .then((res) => res.json())
      .then((data) => setAllRecipes(data))
      .catch((err) => console.error("API error:", err));
  }, [id]);

  if (!recipe) {
    return <p className="loading">Loading recipe...</p>;
  }

  const moreRecipes = allRecipes.filter((r) => r.id !== Number(id)).slice(0, 3);

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="details-main">
        <img
          src={recipe.image?.large || recipe.image?.small}
          alt={recipe.title}
        />
        <div className="details-info">
          <h1>{recipe.title}</h1>
          <p className="desc">{recipe.overview}</p>
          <div className="meta">
            <span>👥 Servings: {recipe.servings}</span>
            <span>⏱ Prep: {recipe.prepMinutes} mins</span>
            <span>🍳 Cook: {recipe.cookMinutes} mins</span>
          </div>

          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients?.map((i, idx) => (
              <li key={idx}>✅ {i}</li>
            ))}
          </ul>

          <h3>Instructions:</h3>
          <ol>
            {recipe.instructions?.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ol>
        </div>
      </div>

      <h2 className="more-title">More recipes</h2>
      <div className="more-recipes">
        {moreRecipes.map((r) => (
          <div key={r.id} className="more-card">
            <img
              src={r.image?.small || r.image?.large}
              alt={r.title}
            />
            <div>
              <h4>{r.title}</h4>
              <p>{r.overview}</p>
              <div className="meta">
                <span>👥 {r.servings}</span>
                <span>⏱ {r.prepMinutes} mins</span>
                <span>🍳 {r.cookMinutes} mins</span>
              </div>
              <button onClick={() => navigate(`/recipes/${r.id}`)}>
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
