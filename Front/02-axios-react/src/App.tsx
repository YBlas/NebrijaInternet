
import { useEffect, useState } from "react";
import './App.css'
import { Character } from "./components/Character";
import type { CharacterT } from "./types";
import { api } from "./api/api";

const App = () => {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [finalName, setFinalName] = useState<string>("");


  const fetchCharacters = async (name: string) => {
    setLoading(true);
    await api
      .get(`/character/${name ? "?name=" + name : ""}`)
      .then((e) => setCharacters(e.data.results))
      .catch((e) => {
        setError(`Error al obtener los datos: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters(finalName);
  }, [finalName]);

  return (
    <>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setFinalName(name);
        }}
      >
        Search
      </button>
      {loading && <h2>Loading...</h2>}
      {error && <h3>Error: {error}</h3>}
      {!loading &&
        characters.map((e) => <Character key={e.id} character={e} />)}
    </>
  );
};

export default App
