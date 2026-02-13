import { useEffect, useState } from "react";
import type { CharacterT } from "../../types";
import { api } from "../../api/api";
import "./style.css";




export const Character = (params: {id?: number, character?: CharacterT}) => {


    const id = params.id;

    const [personajito, setPersonajito] = useState<CharacterT | null>(params.character ? params.character : null);


    useEffect(() => {
        !params.character && id && api.get(`/character/${id}`).then((e) => setPersonajito(e.data));
    }, [id]);

    return(
        <>
            {personajito ? <div className="mainContainer">
                {personajito?.image && <img src={personajito?.image}/>}
                <div className="characterDataContainer">
                    <h2>{personajito?.name}</h2>
                    <p>Origin: {personajito?.origin.name}</p>
                    <p>Location: {personajito?.location.name}</p>
                </div>
            </div> : <h1>Loading...</h1>}
        </>
    )
}