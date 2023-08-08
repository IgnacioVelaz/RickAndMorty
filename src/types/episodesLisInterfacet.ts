import { ApiInterface } from "./apiInterface"
import { EpisodeInterface } from "./episodeInterface"

export interface EpisodesListInterface{
    createdEpisodes: {}[]
    renderedEpisodes: {}[]
    createEpisodesObjects(api: ApiInterface): Promise<EpisodeInterface[]>
}