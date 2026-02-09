
import { useEffect, useState } from 'react';
import { api } from './api/api'
import './App.css'

const App = () => {

  
  const [palabrita, setPalabrita] = useState<string>("");
  const [count, setCount] = useState<number>(0);


  useEffect(()=>{
    api.get("/character").then((e)=>console.log(e.data));
  }, []);

  return (
    <>
      <p>{count}</p>
      <p>{palabrita}</p>
      <button onClick={()=>{setCount(count+1)}}>Sumale Papi</button>
      <input onChange={(e)=>{setPalabrita(e.target.value)}}/>
    </>
  )
}

export default App
