import React, { useState } from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {


  const [isDeleted, setIsDeleted] = useState(false)

  async function deleteHandler() {
    try {
      const response = await fetch(`https://react-movies-3a05d-default-rtdb.firebaseio.com/movies/${props.id}.json`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Document with ID ${props.id} deleted successfully`);
        setIsDeleted(true); 
      
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

 
  if (isDeleted) {
    return null;
  }





  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler}>Delete{props.id}</button>
    </li>
  );
};

export default Movie;
