import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, Recipe, RecipeDetails } from "./pages";
import MainLayout from "./layouts/MainLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "recipe",   
          element: <Recipe />,
        },
        {
          path: "recipes/:id",   
          element: <RecipeDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
