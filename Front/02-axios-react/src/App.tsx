
import { useEffect, useState } from "react";
import './App.css'
import { Character } from "./components/Character";
import type { CharacterT } from "./types";
import { api } from "./api/api";

const App = () => {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [name, setName] = useState<string>("");
  const [finalName, setFinalName] = useState<string>("");

  useEffect(() => {
    api
      .get(`/character/${finalName ? "?name=" + finalName : ""}`)
      .then((e) => setCharacters(e.data.results));
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
      {characters.map((e) => (
        <Character key={e.id} character={e} />
      ))}
    </>
  );
};

export default App
