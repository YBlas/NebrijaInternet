import axios from "axios";



const getCharacter = async (id: number) => {
    const personaje = await axios.get("https://rickandmortyapi.com/api/character/"+id);

    return personaje.data;
};


const getCharacterTheRightWay = async (id: number) => {
    try {
        const res = await axios.get("https://rickandmortyapi.com/api/character/"+id);
        return res.data;
    } catch(err){
        if(axios.isAxiosError(err)){
            console.log("Axios error: "+ err.message)
        }else{
            console.log("Error: " + err)
        }
    }
};

const personaje = await getCharacterTheRightWay(1);

const personaje2 = await getCharacterTheRightWay(2);
console.log(personaje)

//Esto es lo mismito que lo de arriba
getCharacterTheRightWay(1).then((res)=>{
    const per1 = res;
    getCharacterTheRightWay(2).then((res)=>{
        console.log(per1);
    })
});