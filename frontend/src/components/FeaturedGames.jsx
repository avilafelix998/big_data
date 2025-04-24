// src/components/FeaturedGames.jsx

import React from "react";
import GameCard from "./GameCard";

import game1 from "../assets/header.jpg";
import game2 from "../assets/header 1.jpg";
import game3 from "../assets/header 2.jpg";

const games = [
  {
    image: game1,
    title: "Monster Hunter: World",
    price: "USD $19.99",
  },
  {
    image: game2,
    title: "Stray",
    price: "USD $9.99",
  },
  {
    image: game3,
    title: "Balatro",
    price: "Gratis",
  },
];

const FeaturedGames = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Juegos destacados</h2>
      <div className="flex gap-6 flex-wrap">
        {games.map((game, index) => (
          <GameCard
            key={index}
            image={game.image}
            title={game.title}
            price={game.price}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedGames;
