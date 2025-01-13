import { useRef } from "react";
import "./Menu.scss";

import { Film } from "@/utils/interfaces";
import { Link } from "react-router-dom";
import { useFilmContext } from "@/contexts/Films/useFilmContext";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  films: Film[];
  currentIndex: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

export default function Menu(props: Props) {
  const { films, currentIndex, onClickPrevious, onClickNext } = props;

  const { currentFilm } = useFilmContext();

  const backdropRef = useRef<HTMLDivElement>(null);

  function handleClickPreviousButton() {
    onClickPrevious();
    resetBackdropAnimation();
  }

  function handleClickNextButton() {
    onClickNext();
    resetBackdropAnimation();
  }

  function resetBackdropAnimation() {
    if (backdropRef.current) {
      const element = backdropRef.current;
      element.style.animation = "none";
      requestAnimationFrame(() => {
        element.style.animation = "";
      });
    }
  }

  return (
    <div className="menu-container">
      {films.length > 0 ? (
        <>
          {currentFilm && (
            <>
              <div className="backdrop-container" ref={backdropRef}>
                {currentFilm.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${currentFilm.backdrop_path}`}
                    alt={currentFilm.title}
                  />
                )}
              </div>
              <div className="film-content">
                <div className="main-info">
                  <h1 className="title">{currentFilm.title}</h1>
                  <div className="votes-container">
                    <p className="average">{currentFilm.vote_average} / 10</p>
                    <p className="count">{currentFilm.vote_count} Votes</p>
                  </div>
                  <p className="release-date">{currentFilm.release_date}</p>
                  <Link to={`/cinema/room/${currentFilm.id}`} className="find-seat" state={currentFilm}>
                    Find Seat
                  </Link>
                </div>
                <p className="description">
                  {currentFilm.overview ? currentFilm.overview : `No description available`}
                </p>
              </div>
            </>
          )}

          <div className="slide">
            {films &&
              films.map((film, index) => {
                const isPrevious = index < currentIndex;
                const isActive = index === currentIndex;
                const isNext = index === currentIndex + 1;
                const nexts = index > currentIndex;

                const marginTop = isPrevious || isActive ? "1.5rem" : "0"; // Active card moves down slightly
                const marginLeft = isPrevious
                  ? "-25rem" // Cards before currentIndex move left
                  : isActive
                  ? "1.5rem" // Active card has standard spacing
                  : isNext
                  ? "68%" // The next card starts at 68%
                  : `calc(68% + ${(index - currentIndex - 1) * 23.5}%)`; // Subsequent cards have calculated positions

                return (
                  <div
                    key={index}
                    className="film-card"
                    style={{
                      height: `${isActive ? `60%` : `55%`}`,
                      marginLeft,
                      marginTop,
                      top: `${isPrevious || isActive ? `0` : `50%`}`,
                      transform: `translateY(${nexts ? `-50%` : `0`})`,
                    }}
                  >
                    <div className="cover">
                      {currentFilm === film && (
                        <Link to={`/cinema/room/${film.id}`} className="find-seat" state={film} />
                      )}
                      {film.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title} />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="buttons-container">
            {films && currentIndex > 0 && (
              <button className="previous" onClick={handleClickPreviousButton}>
                <i className="fa-solid fa-chevron-left" />
              </button>
            )}
            {films && currentIndex < films?.length - 1 && (
              <button className="next" onClick={handleClickNextButton}>
                <i className="fa-solid fa-chevron-right" />
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="no-film">No film available</p>
      )}
    </div>
  );
}
