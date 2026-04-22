

export type CharacterT = {
      "id": number,
      "name": string,
      "status": string,
      "species": string,
      "type": string,
      "gender": string,
      "origin": {
        "name": string,
        "url": string
      },
      "location": {
        "name": string,
        "url": string
      },
      "image": string,
      "episode": string[],
      "url": string,
      "created": string
    }


export type InfoT = {
    "count": number,
    "pages": number,
    "next": string | null,
    "prev": null | string
}

export type ResultCharactersT = {
    info: InfoT,
    results: CharacterT[]
}