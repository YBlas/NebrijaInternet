'use client';
import { useLista } from "@/context/listaContext";
import "./page.css";
import { useRouter } from "next/navigation";

const Home = () => {

  const { lista } = useLista();
  const router = useRouter();

  return (
    <div className="listContainer">
      <button onClick={()=>router.push("/addToListPage")}>Ir a la página de añadir a la lista</button>
      {lista.map(e => <p key={e}>{e}</p>)}
    </div>
  );
}


export default Home;
