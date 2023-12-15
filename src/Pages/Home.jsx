import { useState, useEffect } from "react"
import MovieCard from "../Components/MovieCard";
import './MovieGrid.css'
import axios from 'axios'


const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {
            await axios.get(url)
            .then((res) => setTopMovies(res.data.results))
            .catch((err) => console.log(err))
    };


    // const getTopRatedMovies = async (url) => {{
    //     const res = await fetch(url);
    //     const data = await res.json();

    //     setTopMovies(data.results);
    // }}

    useEffect(() => {
    
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
        
        getTopRatedMovies(topRatedUrl);

    }, [])

    return(
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            
        </div>
    )
}