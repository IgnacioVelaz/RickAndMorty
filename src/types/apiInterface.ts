import { EpisodeInterface } from "./episodeInterface"

export interface ApiInterface{
    episodesURL: string
    charactersURL: string
    locationsURL: string
    getEpisodesData(): Promise<EpisodeInterface[]>
}

