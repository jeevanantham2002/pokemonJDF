import logo from './logo.svg';
import React, { useState } from 'react';  
import './App.css';


function App() {

  //Uses the useState hooks, returns text and an update function
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  async function searchAndDisplay(){
    let pokemonData =  await getPokemonIndex();
    console.log(pokemonData)
    let imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonData["id"] + ".png";
    setImageUrl(imageUrl)
  } 


  //The .then function passes the output from the previous one throguh the return to the next one thats why there is that input for data
  // You have to define the return for the entire function seperately
  async function getPokemonIndex() {
    let pokemonData;

    await fetch('https://pokeapi.co/api/v2/pokemon/' + text)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log(data);
        pokemonData = data;
        return data;
      })
      .catch(error => {
        console.error(error);
      });

      return pokemonData;
  }


  return (
    <div className="App">
      <header className="App-header">
        <input value={text} onChange={handleChange} type="text" />
        <button onClick={searchAndDisplay}> search </button>
        <img src = {imageUrl} ></img>
      </header>
    </div>
  );
}

export default App;
