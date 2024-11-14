"use client";

import Title from "./components/Title";
import Contents from "./components/Contents";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

function index() {
  const [showBlog, setShowBlog] = useState(false);
  const [randomText, setRandomText] = useState("No button has been clicked!");
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true); 

  function changeBlogs() {
    setShowBlog(!showBlog);

    if (showBlog) {
      setRandomText("This is UMU!");
    } else {
      setRandomText("This is MUK!");
    }
  }


  async function fetchTopMovies() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '90165b2056msh5218e1ec6e762c2p1b30b0jsn0b7be9272e36', 
         'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMoviesData(result);
      setLoading(false); 
       } catch (error) {
      console.error(error);
      setLoading(false); 
       }
  }

  useEffect(() => {
    fetchTopMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading movies...</p> 
        ) : (
        moviesData.map((movie) => (
          <div key={movie.rank}>
            <p>{movie.rank}. {movie.title}</p>
            <img src={movie.thumbnail} alt={movie.title} />
            <small>{movie.description}</small>
          </div>
        ))
      )}

      {showBlog ? (
        <div>
          <Title heading="MAKERERE BLOG" />
          <Contents details="This is a very nice blog from MAK" />
        </div>
      ) : (
        <div>
          <Title heading="UGANDA MARTYRS BLOG" />
          <Contents details="This is a very nice blog from UMU" />
        </div>
      )}

      <br />
      <p>{randomText}</p>

      <Button variant="contained" onClick={changeBlogs}>TOGGLE BLOGS</Button>
    </div>
  );
}

export default index;
