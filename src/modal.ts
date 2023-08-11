import { CharacterInterface } from "./types/characterInterface"
import { CharactersList } from "./charactersList"
import Episode from "./episode.js"
import { ApiInterface } from "./types/apiInterface"
import { EpisodeInterface } from "./types/episodeInterface"
import { EpisodesListInterface } from "./types/episodesLisInterfacet"

export class Modal{
    modalEl: HTMLElement | null
    api: ApiInterface
    modalTitleEl: HTMLParagraphElement 
    modalImageEl: HTMLImageElement 
    modalStatusEl: HTMLParagraphElement 
    modalGenderEl : HTMLParagraphElement   
    modalSpeciesEl : HTMLParagraphElement 
    modalOriginBtn : HTMLButtonElement 
    currentCharacterLocationId : string | null
    episodesList: EpisodesListInterface
    fragment: DocumentFragment 
    accordionBodyEl: HTMLDivElement | null


    constructor(api:ApiInterface, episodesList: EpisodesListInterface){
        this.modalEl = document.querySelector('#modal') as HTMLDivElement
        this.api = api
        this.modalTitleEl = this.modalEl.querySelector('#modalTitle') as HTMLParagraphElement
        this.modalImageEl = this.modalEl.querySelector('#modalImage') as HTMLImageElement
        this.modalStatusEl = this.modalEl.querySelector('#modalStatus') as HTMLParagraphElement
        this.modalGenderEl = this.modalEl.querySelector('#modalGender') as HTMLParagraphElement
        this.modalSpeciesEl = this.modalEl.querySelector('#modalSpecies') as HTMLParagraphElement
        this.modalOriginBtn = this.modalEl.querySelector('#modalOrigin') as HTMLButtonElement
        this.currentCharacterLocationId = null
        this.episodesList = episodesList
        this.fragment = document.createDocumentFragment()
        this.accordionBodyEl = document.querySelector('#accordionBody')
    }
    connectModal(){
        this.modalEl?.addEventListener('show.bs.modal', (event)=>{
            const target = event.relatedTarget
            this.renderCharacterData(target)
        })
    }

    async renderCharacterData(target: HTMLElement){ 
        this.accordionBodyEl!.textContent = ""
        const characterData = await this.getSelectedCharacterData(target)
        
        const locationId = characterData.origin.url.replace(this.api.locationsURL, "")
        
        this.modalTitleEl.textContent = characterData.name
        this.modalImageEl.src = characterData.image
        this.modalImageEl.alt = `${characterData.name} avatar`
        this.modalStatusEl.textContent = `Status: ${characterData.status}`
        this.modalGenderEl.textContent = `Gender: ${characterData.gender}`
        this.modalSpeciesEl.textContent = `Specie: ${characterData.species}`
        this.modalOriginBtn.textContent = characterData.origin.name
        
              
        if (locationId) this.modalOriginBtn.dataset.locationId = locationId
        else if(this.modalOriginBtn.dataset.locationId) this.modalOriginBtn.removeAttribute('data-location-id') 

        this.currentCharacterLocationId = locationId
        
        await this.renderAppearances(characterData)
    }


    async renderAppearances(character:CharacterInterface){
        const loadedAppearances = await this.addAppearances(character)
        const episodesListEl = document.createElement('ul')
        loadedAppearances.forEach(appearance => this.renderAppearance(appearance))
        episodesListEl.append(this.fragment)
        this.accordionBodyEl?.append(episodesListEl)
    }

    renderAppearance(appearance: EpisodeInterface){
        const modalEpisodeEl = document.createElement('li')
        modalEpisodeEl.classList.add('nav-item', 'p-3')
        modalEpisodeEl.dataset.type = 'modalEpisode'
        const modalEpisodeBtnEl = document.createElement('button')
        modalEpisodeBtnEl.classList.add('navBar__episode__btn', 'text-start', 'py-3', 'w-100')
        modalEpisodeBtnEl.dataset.episodeId = appearance.id.toString()
        modalEpisodeBtnEl.dataset.type = "sideBarEpisodeBtn"
        modalEpisodeBtnEl.dataset.bsDismiss = "modal"
        const episodeNameTextNode = document.createTextNode(appearance.listedName)
        modalEpisodeBtnEl.append(episodeNameTextNode) 
        modalEpisodeEl.append(modalEpisodeBtnEl)
        this.fragment.append(modalEpisodeEl)
    }

    async addAppearances(character:CharacterInterface){
        const appearancesIds = this.getAppearancesIds(character)
        
        const loadedAppearances = this.episodesList.renderedEpisodes.filter(episode =>{
            return appearancesIds.includes(episode.id.toString())
        })
        const appearancesToLoad = appearancesIds.filter(id=> !this.episodesList.renderedEpisodes.some(episode => episode.id.toString() === id))        

        if(appearancesToLoad.length === 0) return loadedAppearances
        
        let newEpisodes = await this.api.getSpecificEspisodesData(appearancesToLoad)

        if(!Array.isArray(newEpisodes)) newEpisodes = [newEpisodes]
        if(newEpisodes){
        newEpisodes.forEach(episode=>{ 
            const episodeObject = new Episode(episode)
            loadedAppearances.push(episodeObject)
            this.episodesList.renderedEpisodes.push(episodeObject)
        }) 
        }
        return loadedAppearances
    }

    getAppearancesIds(character:CharacterInterface){
        const appearancesIds = character.episode.map(episode=>{
            return episode.replace(this.api.episodeURL, '')
        })
        return appearancesIds
    }

    async getSelectedCharacterData(target: HTMLElement){ 
        const characterId = target.closest('[data-type="characterCard"]')?.dataset.characterId 
        const characterData = await this.api.getCharacterData(characterId)

        return characterData
    }

    
}
