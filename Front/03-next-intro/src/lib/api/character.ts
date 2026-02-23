import { Character } from "@/types";
import { api } from "./axios"




export const getCharacterById = async (id: number) => {
    const response = await api.get<Character>(`/character/${id}`);
    return response.data;
};