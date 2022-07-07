import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;
const topRatedUrl = `${moviesURL}top_rated?${apiKEY}`;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    async function getTopMovies(url) {
      const res = await fetch(url);
      const data = await res.json();
      const { results } = data;
      setTopMovies(results);
    }
    getTopMovies(topRatedUrl);
  }, []);

  if (topMovies.length < 0) return null;
  return (
    <div className="container">
      <h2 className="title">Melhores filmes: </h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.map(movie => (<MovieCard key={movie.id} movie={movie} />))}
      </div>
    </div>
  );
};

export default Home;
