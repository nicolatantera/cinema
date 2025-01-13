import { Film } from "@/utils/interfaces";
import { createContext, useContext } from "react";

interface FilmContextProps {
  currentFilm: Film | null;
  setCurrentFilm: React.Dispatch<React.SetStateAction<Film | null>>;
}

export const FilmContext = createContext<FilmContextProps | undefined>(undefined);

export function useFilmContext() {
  const context = useContext(FilmContext);

  if (!context) {
    throw new Error("useFilmContext must be used within a FilmProvider");
  }

  return context;
}
