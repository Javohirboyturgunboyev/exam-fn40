import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../pages/recipe.css";

const initialRecipes = [
  {
    id: 1,
    title: "Mediterranean Chickpea Salad",
    desc: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    servings: 2,
    prep: "10 mins",
    cook: "0 min",
    img: "/images/mediterranean-chickpea-salad-large.webp",
  },
  {
    id: 2,
    title: "Avocado & Tomato Wholegrain Toast",
    desc: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    servings: 1,
    prep: "5 mins",
    cook: "5 mins",
    img: "/images/avocado-tomato-wholegrain-toast-large.webp",
  },
  {
    id: 3,
    title: "One-Pan Lemon Garlic Salmon",
    desc: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    servings: 2,
    prep: "5 mins",
    cook: "12 mins",
    img: "/images/salmon-asparagus-large.webp",
  },
  {
    id: 4,
    title: "Quinoa Veggie Power Bowl",
    desc: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    servings: 2,
    prep: "10 mins",
    cook: "15 mins",
    img: "/images/quinoa-veggie-bowl-large.webp",
  },
  {
    id: 5,
    title: "Sweet Potato Black Bean Tacos",
    desc: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    servings: 3,
    prep: "10 mins",
    cook: "15 mins",
    img: "/images/sweet-potato-tacos-large.webp",
  },
  {
    id: 6,
    title: "Greek Yogurt Berry Parfait",
    desc: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    servings: 1,
    prep: "5 mins",
    cook: "0 min",
    img: "/images/greek-yogurt-large.webp",
  },
  {
    id: 7,
    title: "Lentil & Spinach Soup",
    desc: "A hearty 30-minute soup rich in plant protein and iron.",
    servings: 4,
    prep: "10 mins",
    cook: "20 mins",
    img: "/images/lentil-soup-large.webp",
  },
  {
    id: 8,
    title: "Banana Oat Pancakes",
    desc: "Flour-free pancakes sweetened naturally with ripe bananas.",
    servings: 2,
    prep: "5 mins",
    cook: "10 mins",
    img: "/images/banana-pancakes-large.webp",
  },
];

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const num = parseInt(timeStr);
  if (timeStr.includes("hour")) return num * 60;
  return num;
}

export default function Recipe() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    img: "",
    title: "",
    desc: "",
    servings: "",
    prep: "",
    cook: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed.length < initialRecipes.length) {
        setRecipes(initialRecipes);
        localStorage.setItem("recipes", JSON.stringify(initialRecipes));
      } else {
        setRecipes(parsed);
      }
    } else {
      setRecipes(initialRecipes);
      localStorage.setItem("recipes", JSON.stringify(initialRecipes));
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  const filtered = recipes.filter((r) => {
    const searchMatch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());

    const prepOk = maxPrep ? timeToMinutes(r.prep) <= parseInt(maxPrep) : true;
    const cookOk = maxCook ? timeToMinutes(r.cook) <= parseInt(maxCook) : true;

    return searchMatch && prepOk && cookOk;
  });

  const handleAddRecipe = () => {
    if (
      !newRecipe.img ||
      !newRecipe.title ||
      !newRecipe.desc ||
      !newRecipe.servings ||
      !newRecipe.prep ||
      !newRecipe.cook
    ) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...newRecipe,
    };

    setRecipes([...recipes, newItem]);
    setNewRecipe({
      img: "",
      title: "",
      desc: "",
      servings: "",
      prep: "",
      cook: "",
    });
    setShowForm(false);
  };

  const handleClearAll = () => {
    setRecipes(initialRecipes);
    localStorage.setItem("recipes", JSON.stringify(initialRecipes));
  };

  return (
    <div className="recipe-page">
      <div className="container">
        <div className="recipe-header">
          <h1>Explore our simple, healthy recipes</h1>
          <p>
            Discover quick, whole-food dishes that fit real-life schedules and
            taste <br /> amazing. Use the search bar to find a recipe by name or
            ingredient, or simply <br /> scroll the list and let something
            delicious catch your eye.
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
                <img src={r.img} alt={r.title} />
                <div className="card-body">
                  <h2>{r.title}</h2>
                  <p>{r.desc}</p>
                  <div className="meta">
                    <span> <img width="20px" src="/images/icon-servings.svg" alt="" /> {r.servings}</span>
                    <span> <img   width="20px" src="/images/icon-prep-time.svg" alt="" /> Prep: {r.prep}</span>
                    <span> <img  width="20" src="/images/icon-cook-time.svg" alt="" /> Cook: {r.cook}</span>
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
                placeholder="Description"
                value={newRecipe.desc}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, desc: e.target.value })
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
                type="text"
                placeholder="Prep Time (e.g. 10 mins)"
                value={newRecipe.prep}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, prep: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Cook Time (e.g. 15 mins)"
                value={newRecipe.cook}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, cook: e.target.value })
                }
              />
              <button onClick={handleAddRecipe}>Add Recipe</button>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>Made with ❤️ and 🥑</p>
          <div className="socials">
            <a href="#">
              <img src="/images/icon-instagram.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/images/icon-bluesky.svg" alt="Twitter" />
            </a>
            <a href="#">
              <img src="/images/icon-tiktok.svg" alt="TikTok" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
