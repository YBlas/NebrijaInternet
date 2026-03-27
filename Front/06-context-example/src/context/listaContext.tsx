'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type ListaContextType = {
    lista: string[],
    addToList: (item: string) => void,
    deleteFromList: (item: string) => void
};

const ListaContext = createContext<ListaContextType | null>(null);

export const ListaProvider = ({children}: {children: ReactNode}) => {
    const [lista, setLista] = useState<string[]>([]);

    useEffect(()=>{
        const stored = localStorage.getItem('listilla');
        if(stored) {
            setLista(stored.split(','));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('listilla', String(lista));
    }, [lista]);

    const addToList = (item: string) => {
        setLista([...lista, item])
    };
    
    const deleteFromList = (item: string) => {
        setLista(lista.filter(x => x !== item))
    }

    return (
        <ListaContext.Provider value={{lista, addToList, deleteFromList}}>
            {children}
        </ListaContext.Provider>
    )
};

export const useLista = () => {
    const context = useContext(ListaContext);
    if(!context){
        throw new Error("Picha estás fuera del proveedor!")
    }
    return context;
}