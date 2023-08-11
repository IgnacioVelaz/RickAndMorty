import { CharacterInterface } from "./characterInterface"
import { ApiInterface } from "./apiInterface"

export interface CharactersListInterface{
    createdCharacters : {}[]
    renderedCharacters: {}[]
    charactersList: CharacterInterface[] | null
    createCharactersObjects(api:ApiInterface, characters:[]): Promise<void>
}