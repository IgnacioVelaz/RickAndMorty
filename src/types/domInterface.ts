import { EpisodesListInterface } from "./episodesLisInterfacet"
import { EpisodeInterface } from "./episodeInterface"
import { ApiInterface } from "./apiInterface"

export interface DomInterface{
    episodesListEl: HTMLElement | null
    episodesList: EpisodesListInterface
    api: ApiInterface
    getEpisodesList(): Promise <EpisodeInterface[]>
    fragment: DocumentFragment
}