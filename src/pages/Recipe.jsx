import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../pages/Recipe.css";

function timeToMinutes(num) {
  if (!num) return 0;
  return parseInt(num);
}

export default function Recipe() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    overview: "",
    servings: "",
    prepMinutes: "",
    cookMinutes: "",
    img: "",
  });

  // faqat API'dan olish
  useEffect(() => {
    fetch("http://localhost:5001/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data || []);
        localStorage.setItem("recipes", JSON.stringify(data || []));
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  const filtered = recipes.filter((r) => {
    const searchMatch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.overview.toLowerCase().includes(search.toLowerCase());

    const prepOk = maxPrep ? timeToMinutes(r.prepMinutes) <= parseInt(maxPrep) : true;
    const cookOk = maxCook ? timeToMinutes(r.cookMinutes) <= parseInt(maxCook) : true;

    return searchMatch && prepOk && cookOk;
  });

  const handleAddRecipe = () => {
    if (
      !newRecipe.title ||
      !newRecipe.overview ||
      !newRecipe.servings ||
      !newRecipe.prepMinutes ||
      !newRecipe.cookMinutes ||
      !newRecipe.img
    ) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: newRecipe.title,
      overview: newRecipe.overview,
      servings: parseInt(newRecipe.servings),
      prepMinutes: parseInt(newRecipe.prepMinutes),
      cookMinutes: parseInt(newRecipe.cookMinutes),
      image: { small: newRecipe.img, large: newRecipe.img },
    };

    setRecipes([...recipes, newItem]);
    setNewRecipe({
      title: "",
      overview: "",
      servings: "",
      prepMinutes: "",
      cookMinutes: "",
      img: "",
    });
    setShowForm(false);

    fetch("http://localhost:5001/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
  };

  const handleClearAll = () => {
    setRecipes([]);
    localStorage.setItem("recipes", JSON.stringify([]));

    recipes.forEach((r) => {
      fetch(`http://localhost:5001/recipes/${r.id}`, {
        method: "DELETE",
      }).catch((err) => console.error("Delete error:", err));
    });
  };

  return (
    <div className="recipe-page">
      <div className="container">
        <div className="recipe-header">
          <h1>Explore our simple, healthy recipes</h1>
          <p>
            Discover quick, whole-food dishes that fit real-life schedules and
            taste amazing. Use the search bar to find a recipe by name or ingredient.
          </p>
        </div>

        <div className="recipe-controls">
          <select value={maxPrep} onChange={(e) => setMaxPrep(e.target.value)}>
            <option value="">Max Prep Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
          </select>

          <select value={maxCook} onChange={(e) => setMaxCook(e.target.value)}>
            <option value="">Max Cook Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
          </select>

          <input
            type="text"
            placeholder="Search by name or ingredient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="recipe-grid">
          {filtered.length > 0 ? (
            filtered.map((r) => (
              <div key={r.id} className="recipe-card">
                <img src={r.image?.small || r.image?.large} alt={r.title} />
                <div className="card-body">
                  <h2>{r.title}</h2>
                  <p>{r.overview}</p>
                  <div className="meta">
                    <span><img src="/images/icon-servings.svg" alt="" /> {r.servings}</span>
                    <span><img src="/images/icon-prep-time.svg" alt="" /> Prep: {r.prepMinutes} mins</span>
                    <span><img src="/images/icon-cook-time.svg" alt="" /> Cook: {r.cookMinutes} mins</span>
                  </div>
                  <button onClick={() => navigate(`/recipes/${r.id}`)}>
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found 🚫</p>
          )}
        </div>

        <div className="add-recipe-section">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "➕ Add New Recipe"}
          </button>
          <button onClick={handleClearAll}>🗑 Clear All Recipes</button>

          {showForm && (
            <div className="add-form">
              <input
                type="text"
                placeholder="Image URL"
                value={newRecipe.img}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, img: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Title"
                value={newRecipe.title}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Overview"
                value={newRecipe.overview}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, overview: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Servings"
                value={newRecipe.servings}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, servings: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Prep Minutes"
                value={newRecipe.prepMinutes}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, prepMinutes: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Cook Minutes"
                value={newRecipe.cookMinutes}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, cookMinutes: e.target.value })
                }
              />
              <button onClick={handleAddRecipe}>Add Recipe</button>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>Made with ❤️ and 🥑</p>
        </footer>
      </div>
    </div>
  );
}
