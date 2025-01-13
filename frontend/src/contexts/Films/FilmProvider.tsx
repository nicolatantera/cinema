import { Film } from "@/utils/interfaces";
import { useState } from "react";

import { FilmContext } from "./useFilmContext";

interface FilmProviderProps {
  children: React.ReactNode; // Ensure `children` is explicitly typed
}

export function FilmProvider({ children }: FilmProviderProps) {
  const [currentFilm, setCurrentFilm] = useState<Film | null>(null);

  return <FilmContext.Provider value={{ currentFilm, setCurrentFilm }}>{children}</FilmContext.Provider>;
}
