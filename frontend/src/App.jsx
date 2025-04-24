import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedGames from './components/FeaturedGames';
import Charts from './components/Chart';

function App() {
  return (
    <div className="min-h-screen bg-[#1b2838] text-[#c7d5e0]">
      <Header />
      <Hero />
      <FeaturedGames />
      <Charts />
      
    </div>
  );
}

export default App
