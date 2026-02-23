'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {


  const router = useRouter();

  return (
    <div>
      <h1>Primera paginita wey</h1>
      <Link href="/patata">Te lleva a patata</Link>
      <br/>
      <button onClick={()=>{
        router.push("/patata");
      }}>Te lleva a patata pero con lógica</button>
      <button onClick={()=>{
        router.replace("/patata");
      }}>Te lleva a patata pero sin historial</button>
    </div>
  );
}


export default Home;