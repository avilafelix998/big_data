// src/components/GameCard.jsx

import React from "react";

const GameCard = ({ image, title, price }) => {
  return (
    <div className="bg-[#2a475e] p-4 rounded-md w-[300px] text-center text-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-85 cursor-pointer">
      <img src={image} alt={title} className="w-full rounded" />
      <p className="mt-2 text-lg font-semibold">{title}</p>
      <span className="block mt-1 font-bold text-[#a4d007]">{price}</span>
    </div>
  );
};

export default GameCard;
