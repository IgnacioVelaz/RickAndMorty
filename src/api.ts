import { ApiInterface } from "./types/apiInterface"
import { EpisodeInterface } from "./types/episodeInterface"

export class Api implements ApiInterface{
    episodesURL: string
    charactersURL: string
    locationsURL: string

    constructor(){
        this.episodesURL = "https://rickandmortyapi.com/api/episode?page=1"
        this.charactersURL = "https://rickandmortyapi.com/api/character"
        this.locationsURL = "https://rickandmortyapi.com/api/location"
    }
    async getEpisodesData(): Promise<EpisodeInterface[]>{
        const res = await fetch(this.episodesURL)
        const data = await res.json()
        const {results: episodesDataArray, info: { next: nextEpisodesURL}} = data
        this.episodesURL = nextEpisodesURL
        return episodesDataArray
    }
}