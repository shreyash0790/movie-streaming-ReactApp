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
    const response= await fetch('https://react-movies-3a05d-default-rtdb.firebaseio.com/movies.json');

    if(!response.ok){
      throw new Error('Something Went Wrong!')
    }


    const data= await response.json();

    const loadedMovies=[];

    for(const key in data){
      loadedMovies.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate,
      })
    }



    setMovies(loadedMovies)
  
  }
  catch(err){
   setError(err.message)
  }
  setisLoading(false)
   
},[])

useEffect(()=>{
fetchMoviesHandler()
},[fetchMoviesHandler])

 async function addMovieHandler(movie) {
 try{
const response= await fetch('https://react-movies-3a05d-default-rtdb.firebaseio.com/movies.json',{
method:'POST',
body:JSON.stringify(movie)
 })

const data= await response.json();
console.log(data)

 }catch(err){
  console.log(err)
 }
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
      <AddMovie  onAddMovie={addMovieHandler} />
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
