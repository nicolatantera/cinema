import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Room from "@/pages/Room/Room";
import NoPage from "@/pages/NoPage/NoPage";
import { FilmProvider } from "@/contexts/Films/FilmProvider";

const router = createBrowserRouter([
  {
    path: "/cinema",
    element: <Home />,
  },
  {
    path: "/cinema/room/:roomId",
    element: <Room />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

export default function App() {
  return (
    <FilmProvider>
      <RouterProvider router={router} />
    </FilmProvider>
  );
}
