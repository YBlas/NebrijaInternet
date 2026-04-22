import { CharacterT } from "@/app/types/RicardoYMortirio";
import "./styles.css";




const CharacterChulangano = ({personaje} : {personaje: CharacterT}) => {
    return(
        <div className="ContainerChulangano">
            <img src={personaje.image}/>
            <div className="InfoContainer">
                <h1>{personaje.name}</h1>
                <p>{personaje.gender}</p>
                <p>{personaje.status}</p>
                <p>{personaje.origin.name}</p>
            </div>
        </div>
    )
};

export default CharacterChulangano