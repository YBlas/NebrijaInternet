export type CastT = {
    name: string,
    sex: string,
    roles: string[]
}

export type FilmT = {
    _id?:string,
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