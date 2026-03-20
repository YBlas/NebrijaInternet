'use client';
import { useLista } from "@/context/listaContext";
import { useRouter } from "next/navigation";
import { useState } from "react";



const AddToListPage = () => {

    const { addToList } = useLista();

    const router = useRouter();

    const [inputText, setInputText] = useState("");

    return (
        <div>
            <button onClick={()=> router.push("/")}>Go to home page</button>
            <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => {
                    if(e.key === "Enter"){
                        addToList(inputText);
                        setInputText("");
                    }
                }}
            />
        </div>
    )
}


export default AddToListPage;