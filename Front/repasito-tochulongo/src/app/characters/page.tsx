"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { ResultCharactersT } from "../types/RicardoYMortirio";
import api from "@/api/api";
import CharacterChulangano from "../components/CharacterChulangano";
import Paginador from "../components/Paginador";






const CharactersPage = () => {

    const [resultCharacters, setResultCharacters] = useState<ResultCharactersT | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchCharacters = () => {
        try{
            api.get(`/character?page=${page}`).then((e)=>{
                const {data} : {data: ResultCharactersT} = e;
                setResultCharacters(data);
            }).finally(()=>{
                setLoading(false);
            })
        }catch(e){
            alert(String(e));
        }
    }

    useEffect(()=>{
        fetchCharacters();
    },[page]);

    if(loading){
        return(<h1>Loading...</h1>)
    }

    return (
        <div className="ContainerCharacters">
            {resultCharacters && resultCharacters.results.map((e)=>(<CharacterChulangano key={e.id} personaje={e}/>))}
            <Paginador next={!!resultCharacters?.info.next} prev={!!resultCharacters?.info.prev} page={page} setPage={(e)=>{
                setPage(e);
            }}/>
        </div>
    )
};


export default CharactersPage;