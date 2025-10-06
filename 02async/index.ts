import axios from "axios";



const getCharacter = async (id: number) => {
    const personaje = await axios.get("https://rickandmortyapi.com/api/character/"+id);

    return personaje.data;
};


const getCharacterTheRightWay = async (id: number) => {
  try {
    const res = await axios.get(
      "https://rickandmortyapi.com/api/character/" + id
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios error: " + err.message);
    } else {
      console.log("Error: " + err);
    }
  }
};

// const personaje = await getCharacterTheRightWay(1);

// const personaje2 = await getCharacterTheRightWay(2);
// console.log(personaje);

//Esto es lo mismito que lo de arriba
// getCharacterTheRightWay(1).then((res) => {
//   const per1 = res;
//   getCharacterTheRightWay(2).then((res) => {
//     console.log(per1);
//   });
// });

//Varios promesas

const getCharacters = async (ids: number[]) => {
  //   ids.forEach(async (x) => {
  //     console.log(await getCharacter(x));
  //   });

  //Lo mismo que lo de arriba para entenderlo
  console.log(await getCharacter(ids[0]!));
  console.log(await getCharacter(ids[1]!));
  console.log(await getCharacter(ids[2]!));
};

// getCharacters([1, 2, 3]);

const getMultipleCharacters = async (ids: number[]) => {
  const promesas = ids.map(async (elem) => {
    const arrayDePromesas1 = (
      await axios.get(`https://rickandmortyapi.com/api/character/${elem}`)
    ).data;

    return arrayDePromesas1;
  });

  const responses = await Promise.all(promesas);
  return responses;
};

const personajes = await getMultipleCharacters([4, 5, 6]);

// console.log(personajes);

const getCharacterSafe = async (ids: number[]) => {
  const promesas = ids.map(
    async (elem) =>
      (await axios.get(`https://rickandmortyapi.com/api/character/${elem}`))
        .data
  );

  const results = await Promise.allSettled(promesas);

  results.forEach((elem) => {
    if (elem.status == "fulfilled") {
      console.log(elem.value);
    } else {
      console.log(elem.status, "Error");
    }
  });
};

getCharacterSafe([8, 9, 10]);