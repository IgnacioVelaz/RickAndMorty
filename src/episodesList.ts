import { EpisodesListInterface } from "./types/episodesLisInterfacet"
import { ApiInterface } from "./types/apiInterface"
import Episode from "./episode.js" // Why does it work only with ".js" extension and only with default export ?
import { EpisodeInterface } from "./types/episodeInterface"

export class EpisodesList implements EpisodesListInterface{
    createdEpisodes : {}[]
    renderedEpisodes: {}[]

    constructor(){
        this.createdEpisodes = []
        this.renderedEpisodes = []
    }
    async createEpisodesObjects(api:ApiInterface): Promise<EpisodeInterface[]>{
        const episodesData = await api.getEpisodesData()
        const episodesList = episodesData.map(episode=> new Episode(episode))
        return episodesList
    }
}