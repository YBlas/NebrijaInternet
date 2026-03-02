'use client';
import { useState } from "react";
import "./page.css";
import Counter from "./components/counter";
import Producto from "./components/product";

export type CosaCompra = {
  name: string,
  id: string
}

const Home = () => {

  const [listilla, setListilla] = useState<CosaCompra[]>([]);
  const productos = ["tebeo", "laserdisc", "pc"];

  return (
    <div className="page">
      <div className="lista">
        <h2>Cosas compradas</h2>
        {listilla.map((e)=>(
          <div key={e.id}>
            <h3 onClick={()=>{
              setListilla(listilla.filter((x)=>x.id !== e.id))
            }} className="elementoLista">{e.name}</h3>
          </div>
        ))}
      </div>
      <div className="lista">
        <h2>Productos a comprar:</h2>
        {productos.map((e)=>(
          <Producto lista={listilla} setLista={setListilla} name={e} key={e}/>
        ))}
      </div>
    </div>
  );
}


export default Home;