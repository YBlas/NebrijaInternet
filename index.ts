



const promesaRickyMorty = fetch("https://rickandmortyapi.com/api/character/1");

promesaRickyMorty
  .then((response) => {
    const data = response.json();
    data.then((character) => {
      console.log(character);
    });
  })
  .catch((error) => {
    console.log("Error en la petición", error);
  })
  .finally(() => {
    console.log("Felicidades has conseguido un personaje o no.");
  });

console.log("¿Qué tal estais guapos?");

