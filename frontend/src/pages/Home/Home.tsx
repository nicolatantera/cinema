import "./Home.scss";

import Menu from "@/components/Menu/Menu";
import OptionsMenu from "@/components/OptionsMenu/OptionsMenu";
import { useEffect, useState } from "react";
import { Country, Film, Films } from "@/utils/interfaces";
import { useFilmContext } from "@/contexts/Films/useFilmContext";
import { languages, countries } from "@/utils/consts";

export default function Home() {
  const [data, setData] = useState<Films>();
  const [films, setFilms] = useState<Film[]>();
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    iso_3166_1: "US",
    english_name: "United States of America",
    native_name: "United States",
  });
  const [language, setLanguage] = useState<string>("en");
  const [regionCode, setRegionCode] = useState<string>("US");

  const { currentFilm, setCurrentFilm } = useFilmContext();

  const currentIndex = films ? films.findIndex((film) => film.id === currentFilm?.id) : -1;

  useEffect(() => {
    // When the website is opened the first time, set the first film in the list as the default one
    setCurrentFilm(films ? films[0] : null);
  }, [films, setCurrentFilm]);

  // fetching data
  useEffect(() => {
    const fetchFilms = async () => {
      // console.log(language, regionCode);
      const url: string = `${import.meta.env.VITE_BASE_URL}/api/now-playing?language=${language}&region=${regionCode}`;
      // console.log(url);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(`HTTP Error!\n Status: ${res.status}`);
        }

        const data: Films = await res.json();
        //console.log(data);
        setData(data);
        setFilms(data.results);
      } catch (error) {
        console.log("Error while fetching films: ", error);
      }
    };
    fetchFilms();
  }, [language, regionCode]);

  function handleClickPrevious() {
    if (films && currentIndex > 0) {
      setCurrentFilm(films[currentIndex - 1]);
    }
  }

  function handleClickNext() {
    if (films && currentIndex < films.length - 1) {
      setCurrentFilm(films[currentIndex + 1]);
    }
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const country = countries.find((c) => c.iso_3166_1 === e.target.value); // e is the country code
    // Get the language based on the selected country
    if (country) {
      const currLanguage = languages.find((lang) => lang.iso_639_1 === country.iso_3166_1.toLowerCase());
      const currlanguageCode = currLanguage?.iso_639_1 || "en"; // Default to English if not found
      const currRegionCode = country.iso_3166_1;

      setLanguage(currlanguageCode);
      setRegionCode(currRegionCode);
      setSelectedCountry(country);
    }
  }

  return (
    <div className="home-container">
      {selectedCountry && (
        <OptionsMenu
          countries={countries}
          selectedCountry={selectedCountry}
          onHandleChange={(e) => handleCountryChange(e)}
        />
      )}
      {films && (
        <Menu
          films={films}
          currentIndex={currentIndex}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
        />
      )}
    </div>
  );
}
