import { EpisodeInterface } from "./types/episodeInterface"

class Episode implements EpisodeInterface{
    air_date: string
    characters: string[]
    created: string
    episode: string
    id: number
    name: string
    url: string
    constructor({
        air_date,
        characters,
        created,
        episode,
        id,
        name,
        url
    }: EpisodeInterface){
        this.air_date = air_date
        this.characters = characters
        this.created = created
        this.episode = episode
        this.id = id
        this.name = name
        this.url = url
    }
    get listedName(): string{
        return `${this.episode}: ${this.name}`
    }
}

export default Episode