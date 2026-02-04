import axios from "axios";

axios.get("https://rickandmortyapi.com/api/character/1").then((response) => {
  console.log(response.data);
});
