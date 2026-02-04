


type HelloParams = {
    name: string;
}



const Saludo = ({name}: HelloParams) => {
    return <h2>Hola guapi de nombre {name}</h2>
};

export default Saludo;