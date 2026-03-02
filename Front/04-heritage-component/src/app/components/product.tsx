'use client';

import type { CosaCompra } from "../page";

type Params = {
    name: string,
    lista: CosaCompra[],
    setLista: React.Dispatch<React.SetStateAction<CosaCompra[]>>
}

const Producto = ({name, lista, setLista}: Params) => {
return(
    <div>
        <h2>{name}</h2>
        <button onClick={()=>{
            setLista([...lista, {
                name: name,
                id: String(Math.random())
            }])
        }}>Buy</button>
    </div>
)
};

export default Producto;