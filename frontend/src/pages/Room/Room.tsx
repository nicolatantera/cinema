import "./Room.scss";
import Screen from "@/components/Screen/Screen";

import { Link, useParams } from "react-router-dom";
import SeatSVG from "@/assets/SeatSVG";
import { useState, useEffect } from "react";
import { useFilmContext } from "@/contexts/Films/useFilmContext";

export default function Room() {
  const { roomId } = useParams();
  const { currentFilm } = useFilmContext();

  const numberOfSeats = 218; // 33 each row

  // Create an array of seat numbers
  const seats = Array.from({ length: numberOfSeats }, (_, index) => index + 1);

  // State to keep track of selected seats
  const storedSeats = localStorage.getItem(`selectedSeats-${roomId}`);
  const [selectedSeats, setSelectedSeats] = useState<number[]>(storedSeats ? JSON.parse(storedSeats) : []);

  // Save selected seats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`selectedSeats-${roomId}`, JSON.stringify(selectedSeats));
  }, [selectedSeats, roomId]);

  function handleSeatClick(seat: number) {
    setSelectedSeats((prevSelectedSeats) => {
      // Toggle seat selection
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  }

  if (!currentFilm) {
    return <div>No film data available.</div>;
  }

  return (
    <div className="room-container">
      <Link to="/cinema/">
        <i className="fa-solid fa-chevron-left"></i>
      </Link>
      <h1>{currentFilm.title}</h1>
      <Screen />
      <div className="seats-container">
        {seats.map((seat, index) => {
          const isSelected = selectedSeats.includes(seat);

          return (
            <div
              key={index}
              className={`seat-container${isSelected ? " selected" : ""}`}
              onClick={() => handleSeatClick(seat)}
            >
              <SeatSVG />
            </div>
          );
        })}
      </div>
    </div>
  );
}
