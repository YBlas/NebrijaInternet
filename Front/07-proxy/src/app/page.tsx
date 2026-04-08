'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Página principal</h1>
      <button onClick={()=>{
        document.cookie = "esLegal=true; path=/"
      }}>Soy legal</button>

      <button
      onClick={()=>{
        document.cookie = "esLegal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }}
      >Soy un macarra, soy un hortera, voy a toda hostia por la carretera.</button>
      <Link href={"/importante"}>Ir a página super importante</Link>
    </div>  );
}
