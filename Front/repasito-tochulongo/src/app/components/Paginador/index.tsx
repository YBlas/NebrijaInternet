import "./styles.css";

const Paginador = ({next,prev,page,setPage}: {
    next: boolean,
    prev: boolean,
    page: number,
    setPage: (page: number) => void
}) => {

    return(
        <div className="PaginadorContainer">
            {prev && <div className="arrowContainer" onClick={()=>{
                setPage(page-1);
            }}><p>{"<"}</p></div>}
            <h1>{page}</h1>
            {next && <div className="arrowContainer" onClick={()=>{
                setPage(page+1);
            }}><p>{">"}</p></div>}
        </div>
    )
}


export default Paginador;