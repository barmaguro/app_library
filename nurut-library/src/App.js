import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const limit = 20;

function App() {
  const [characters, setCharacters] = useState([]);
  const [page,setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
 
    setIsLoading(true);
    const result = await axios.get(apiUrl,{params:{page,limit}});
    setCharacters(result.data.characters);
    setIsLoading(false);
    console.log(result);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }
  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <img src="logo.png" alt="ロゴ" className="logo" />
        </div>
      </header>
      {isLoading ? <div className="loading">now Loading...</div> :
      <main>
        <h1>Naruto図鑑</h1>
        <div className="cards-container">
          {characters.map((character) => {
            return  <div className="card" key={character.id}>
              {character.name} 
              <img src={character.images[0] != null ? character.images[0] :'dummy.png'} alt={character.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{character.name}   </h3>
                <p className="card-description">
                  {character.debut?.appearsIn ?? "N/A"}
                </p>    
                  <span className="affiliation">{character.personal?.affiliation ?? 'undifined'}</span>       
              </div>
            </div>;
          })}
        </div>
        <div className="pager">
          <button disabled={page === 1} className="prev" onClick={handlePrev}>prev</button>
          <span className="page-number">{page}</span>
          <button disabled={limit > characters.length } className="next" onClick={handleNext}>next</button>
        </div>
      </main>
      }
    </div>
  );
}

export default App;
