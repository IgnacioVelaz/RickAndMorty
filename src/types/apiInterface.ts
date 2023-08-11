import { EpisodeInterface } from "./episodeInterface"
import { CharacterInterface } from "./characterInterface"

export interface ApiInterface{
    episodesURL: string
    charactersURL: string
    locationsURL: string
    episodeURL: string
    getEpisodesData(): Promise<EpisodeInterface[]>
    getCharactersData(charactersIds:number[]): Promise<CharacterInterface[]>
    getCharacterData(characterId:number): Promise<CharacterInterface>
    getLocationData(locationId:number): Promise<LocationInterface> 
    getSpecificEspisodesData(episodesIds: string[]):Promise<EpisodeInterface[]>
}

