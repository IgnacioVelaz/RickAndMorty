import { DomInterface } from "./types/domInterface"
import { ApiInterface } from "./types/apiInterface"
import { EpisodesListInterface } from "./types/episodesLisInterfacet"
import { EpisodeInterface } from "./types/episodeInterface"


export class Dom implements DomInterface{
    episodesListEl: HTMLElement | null
    episodesList: EpisodesListInterface
    api: ApiInterface
    fragment: DocumentFragment
    lastLoadedEpisodeEl: HTMLElement | null

    constructor(episodesList: EpisodesListInterface, api: ApiInterface){
        this.episodesListEl = document.querySelector('#episodes__list')
        this.episodesList = episodesList
        this.api = api
        this.fragment = document.createDocumentFragment()
        this.lastLoadedEpisodeEl = null
    }

    async getEpisodesList(): Promise<EpisodeInterface[]>{
        const episodesObjects = await this.episodesList.createEpisodesObjects(this.api)
        return episodesObjects
    }

    async addEpisodesToList(): Promise<void>{
        if(this.api.episodesURL){
        const episodesObjects = await this.getEpisodesList()
        episodesObjects.forEach(episode => {
            this.addEpisodeToList(episode)
        })
        this.episodesListEl?.append(this.fragment) // Crear un if para chequear que exista y tirar error si no existe
        }
    }

    async addEpisodeToList(episode: EpisodeInterface){
        const episodeEl = document.createElement('li')
        episodeEl.classList.add('nav-item', 'p-3')
        episodeEl.dataset.type = 'navBarEpisode'
        const episodeBtnEl = document.createElement('button')
        episodeBtnEl.classList.add('navBar__episode__btn', 'py-3')
        const episodeNameTextNode = document.createTextNode(episode.listedName)
        episodeBtnEl.append(episodeNameTextNode) 
        episodeEl.append(episodeBtnEl)
        this.fragment.append(episodeEl)
    }

    setInfiniteScroll(){
        const observer = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){ 
                console.log(entries[0].target)
                observer.unobserve(entries[0].target)
                this.addEpisodesToList()
                this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child')! // Set Type
                if(this.api.episodesURL) observer.observe(this.lastLoadedEpisodeEl)
            }
        })
        this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child')! // Set Type
        observer.observe(this.lastLoadedEpisodeEl)
    }
}