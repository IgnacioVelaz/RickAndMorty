import { Character } from "./character.js";
import { CharacterInterface } from "./types/characterInterface.js";
import { ApiInterface } from "./types/apiInterface";

export class CharactersList { 
    createdCharacters : {}[]
    renderedCharacters: {}[]
    charactersList: CharacterInterface[] | null

    constructor(){
        this.createdCharacters = []
        this.renderedCharacters = []
        this.charactersList = null
    }
    async createCharactersObjects(api:ApiInterface, characters:[]): Promise<void>{
        const charactersData = await api.getCharactersData(characters)
        this.charactersList = charactersData.map(character=> new Character(character))
    }
}
