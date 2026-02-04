
import "./App.css";
import Saludo from "./components/hello";
import { Counter } from "./components/count";
const MiFuncioncitaPresumida = () => {


  const name = "Paqui";

  return (
    <div className="mainContainer">
      <h1>Pedazo de título increíble</h1>
      <Saludo name={name}/>
      <Counter name={name}/>
    </div>)
}

export default MiFuncioncitaPresumida;