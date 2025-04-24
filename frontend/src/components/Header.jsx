import React from "react";
import logoSteam from "../assets/logo_steam.svg";

const Header = () => {
  return (
    <header className="bg-[#171a21] flex justify-between items-center px-8 py-4">
      <div className="flex-shrink-0">
        <img
          src={logoSteam}
          alt="Logo Steam"
          className="w-[180px] h-[100px] object-contain"
        />
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="text-[#c7d5e0] font-medium hover:text-[#66c0f4]">
          TIENDA
        </a>
        <a href="#" className="text-[#c7d5e0] font-medium hover:text-[#66c0f4]">
          COMUNIDAD
        </a>
        <a href="#" className="text-[#c7d5e0] font-medium hover:text-[#66c0f4]">
          ACERCA DE
        </a>
        <a href="#" className="text-[#c7d5e0] font-medium hover:text-[#66c0f4]">
          SOPORTE
        </a>
      </nav>
    </header>
  );
};

export default Header;