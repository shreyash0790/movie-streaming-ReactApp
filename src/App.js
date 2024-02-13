import React, { useEffect, useState , useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

const [movies,setMovies]=useState([])
const [isLoading, setisLoading]=useState(false)
const [error ,setError]=useState(null)



  const fetchMoviesHandler= useCallback(async ()=>{
    setisLoading(true)
    setError(null)
    try{
    const response= await fetch('https://swapi.dev/api/films/');

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
   
},[])

useEffect(()=>{
fetchMoviesHandler()
},[fetchMoviesHandler])

function addMovieHandler(movie) {
  console.log(movie);
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
      <AddMovie  onAddMovie={addMovieHandler}/>
      </section>
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
