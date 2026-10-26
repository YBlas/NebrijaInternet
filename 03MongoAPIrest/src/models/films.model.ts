import type { ObjectId } from "mongodb"



export type FilmT = {
    _id?: ObjectId,
    name: string,
    runtime: number
}