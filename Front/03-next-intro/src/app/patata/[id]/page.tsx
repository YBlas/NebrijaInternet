'use client';
import { getCharacterById } from "@/lib/api/character";
import { Character } from "@/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const EstaRecibeId = () => {

    const { id } = useParams();

    const [personaje, setPersonaje] = useState<Character|null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        getCharacterById(Number(id)).then((res)=>{
            setPersonaje(res);
        }).catch((e:AxiosError)=>{
            setError(e.message)
        }).finally(()=>{
            setLoading(false);
        })
    },[id]);

    return(
        <div>
            <h1>Esta es la que recibe el id y dicho id es: {id}</h1>
            {!personaje && loading && <h1>Loading...</h1>}
            {personaje &&
            (<>
                <img src={personaje.image}/>
                <h2>{personaje.name}</h2>
            </>)}
            {error && <h2>{error}</h2>}
        </div>
    )

};


export default EstaRecibeId;