import type { ObjectId } from "mongodb";

export type CastT = {
    name: string,
    sex: string,
    roles: string[]
}

export type FilmT = {
    _id?:ObjectId,
    name: string,
    director: string,
    runtime: number,
    year: number,
    recordingFormat: string[],
    cast: CastT[]
}

export type FilmPatchT = {
    name?: string,
    director?: string,
    runtime?: number,
    year?: number,
    recordingFormat?: string[],
    cast?: CastT[]
}