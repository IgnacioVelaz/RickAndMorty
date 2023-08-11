export interface CharacterInterface{
    id: number,
    name: string,
    status: CharacterStatus,
    species: string,
    type: string,
    gender: CharacterGender,
    origin: string,
    image: string,
    episode: string[],
    url: string,
    created: string
}

export enum CharacterStatus{
    "Alive",
    "Dead",
    "unknown"
}

export enum CharacterGender{
    "Female",
    "Male",
    "Genderless",
    "unknown"
}