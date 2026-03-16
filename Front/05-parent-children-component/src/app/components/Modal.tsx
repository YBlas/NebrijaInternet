'use client';
import "./Modal.css";

const ContainerButtonBack = ({children, setState} : {children?: React.ReactNode, setState: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        <div className="container" onClick={()=>setState(false)}>
            <div className="innerContainer">
                 {children}
            </div>
        </div>
    )
};


export default ContainerButtonBack;