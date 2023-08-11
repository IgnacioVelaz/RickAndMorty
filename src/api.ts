import { ApiInterface } from "./types/apiInterface"
import { EpisodeInterface } from "./types/episodeInterface"
import { CharacterInterface } from "./types/characterInterface"

export class Api implements ApiInterface{
    episodesURL: string
    charactersURL: string
    locationsURL: string
    episodeURL: string

    constructor(){
        this.episodesURL = "https://rickandmortyapi.com/api/episode?page=1"
        this.charactersURL = "https://rickandmortyapi.com/api/character/"
        this.locationsURL = "https://rickandmortyapi.com/api/location/"
        this.episodeURL = "https://rickandmortyapi.com/api/episode/"
    }

    async getEpisodesData(): Promise<EpisodeInterface[]>{
        const res = await fetch(this.episodesURL)
        const data = await res.json()
        const {results: episodesDataArray, info: { next: nextEpisodesURL}} = data
        this.episodesURL = nextEpisodesURL
        return episodesDataArray
    }

    async getSpecificEspisodesData(episodesIds: string[]): Promise<EpisodeInterface[]>{
        const episodesIdsString = episodesIds.join(',')
        const res = await fetch(`${this.episodeURL}${episodesIdsString}`)
        const data = await res.json()
        return data
    }   

    async getCharactersData(charactersIds:number[]): Promise<CharacterInterface[]>{
        const characterIdsString = charactersIds.map(characterId => characterId.toString().replace(this.charactersURL, "")).join(',')
        const res = await fetch(`${this.charactersURL}${characterIdsString}`)
        const data = await res.json()
        return data
    }
    async getCharacterData(characterId:number){
        const res = await fetch(`${this.charactersURL}${characterId}`)
        const data = await res.json()
        return data
    }
    async getLocationData(locationId:number){
        const res = await fetch(`${this.locationsURL}${locationId}`)
        const data = await res.json()
        return data
    }    
}