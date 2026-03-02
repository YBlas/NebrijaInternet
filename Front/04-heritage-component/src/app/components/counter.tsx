'use client';

type Params = {
    elNumerito: number,
    setNumerito: React.Dispatch<React.SetStateAction<number>>
}


const Counter = ({elNumerito, setNumerito}: Params) => {

    return (
        <div>
            <h2>{elNumerito}</h2>
            <button onClick={()=>{setNumerito(elNumerito+1)}}>++</button>
        </div>
    )

}


export default Counter;