import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

const [movies,setMovies]=useState([])
const [isLoading, setisLoading]=useState(false)
const [error ,setError]=useState(null)

  async function fetchMoviesHandler (){
    setisLoading(true)
    setError(null)
    try{
    const response= await fetch('https://swapi.dev/api/film/');

    if(!response.ok){
      throw new Error('Something Went Wrong!')
    }


    const data= await response.json();

    const transformedMovies=data.results.map((movieData)=>{
      return {
        id:movieData.episode_id,
        title:movieData.title,
        openingText:movieData.opening_crawl,
        releaseDate:movieData.release_date,
      } 
    });
    setMovies(transformedMovies)
  
  }
  catch(err){
   setError(err.message)
  }
  setisLoading(false)
   
}

let content= <p>No Movies Found!</p>

if(movies.length>0){
  content=<MoviesList movies={movies} />
}

if(error){
  content=<p>{error}</p>
}

if(isLoading){
  content=<p>Loading...</p>
}






  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
