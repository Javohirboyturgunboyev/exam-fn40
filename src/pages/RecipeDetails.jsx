import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAllRecipes(parsed);
      const found = parsed.find((r) => r.id === Number(id));
      setRecipe(found);
    }
  }, [id]);

  if (!recipe) {
    return <p className="loading">Loading recipe...</p>;
  }


  const moreRecipes = allRecipes.filter((r) => r.id !== Number(id)).slice(0, 3);

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      
      <div className="details-main">
        <img src={recipe.img} alt={recipe.title} className="details-img" />

        <div className="details-info">
          <h1>{recipe.title}</h1>
          <p className="desc">{recipe.desc}</p>
          <div className="meta">
            <span>👥 Servings: {recipe.servings}</span>
            <span>⏱ Prep: {recipe.prep}</span>
            <span>🍳 Cook: {recipe.cook}</span>
          </div>

          <h3>Ingredients:</h3>
          <ul>
            <li>Sample ingredient 1</li>
            <li>Sample ingredient 2</li>
            <li>Sample ingredient 3</li>
            <li>Sample ingredient 4</li>
          </ul>

          <h3>Instructions:</h3>
          <ol>
            <li>Step 1 – Write preparation instructions here.</li>
            <li>Step 2 – Add more steps for cooking.</li>
            <li>Step 3 – Serve & enjoy.</li>
          </ol>
        </div>
      </div>

      <h2 className="more-title">More recipes</h2>
      <div className="more-recipes">
        {moreRecipes.map((r) => (
          <div key={r.id} className="more-card">
            <img src={r.img} alt={r.title} />
            <div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div className="meta">
                <span>👥 {r.servings}</span>
                <span>⏱ {r.prep}</span>
                <span>🍳 {r.cook}</span>
              </div>
              <button onClick={() => navigate(`/recipes/${r.id}`)}>View Recipe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
