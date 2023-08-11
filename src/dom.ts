import { DomInterface } from "./types/domInterface"
import { ApiInterface } from "./types/apiInterface"
import { EpisodesListInterface } from "./types/episodesLisInterfacet"
import { EpisodeInterface } from "./types/episodeInterface"
import { getRandomNum} from "./utils.js" 
import { CharactersListInterface } from "./types/chatactersListInterface"
import { CharacterInterface } from "./types/characterInterface"

export class Dom{
    episodesListEl: HTMLElement | null
    episodesList: EpisodesListInterface
    api: ApiInterface
    fragment: DocumentFragment
    lastLoadedEpisodeEl: HTMLElement | null
    sideBarChaptersContainer: HTMLDivElement | null
    loadedEpisodes: EpisodeInterface[]
    mainInfoContainer: HTMLDivElement | null
    charactersList : CharactersListInterface
    charactersPerLoad : number
    unrenderedCharacters : CharacterInterface[] | null
    characterCardTemplate: DocumentFragment
    characterCardsFragment: DocumentFragment
    lastLoadedCharacterEl: HTMLElement | null
    renderedCharacters: CharacterInterface[] | null
    modal: any 

    constructor(episodesList: EpisodesListInterface, api: ApiInterface, charactersList: CharactersListInterface, modal:any ){  
        this.episodesListEl = document.querySelector('#episodes__list')
        this.episodesList = episodesList
        this.api = api
        this.fragment = document.createDocumentFragment()
        this.lastLoadedEpisodeEl = null
        this.sideBarChaptersContainer = document.querySelector('#sideBarChaptersContainer')
        this.loadedEpisodes = []
        this.mainInfoContainer = document.querySelector('#mainInfoContainer')
        this.charactersList = charactersList 
        this.charactersPerLoad = 6        
        this.unrenderedCharacters = null
        this.characterCardTemplate = document.querySelector('#characterCardTemplate')!.content
        this.characterCardsFragment = document.createDocumentFragment()
        this.lastLoadedCharacterEl = null
        this.renderedCharacters = null
        this.modal = modal
    }

    async getEpisodesList(): Promise<EpisodeInterface[]>{
        const episodesObjects = await this.episodesList.createEpisodesObjects(this.api)
        return episodesObjects
    }

    async addEpisodesToList(): Promise<void>{
        if(this.api.episodesURL){
        const episodesObjects = await this.getEpisodesList()
        episodesObjects.forEach(episode => {
            this.loadedEpisodes.push(episode)
            this.addEpisodeToList(episode)
        })
        this.episodesListEl?.append(this.fragment) 
        }
    }

    async addEpisodeToList(episode: EpisodeInterface){
        const episodeEl = document.createElement('li')
        episodeEl.classList.add('nav-item', 'p-3')
        episodeEl.dataset.type = 'navBarEpisode'
        const episodeBtnEl = document.createElement('button')
        episodeBtnEl.classList.add('navBar__episode__btn', 'text-start', 'py-3', 'w-100')
        episodeBtnEl.dataset.episodeId = episode.id.toString()
        episodeBtnEl.dataset.type = "sideBarEpisodeBtn"
        const episodeNameTextNode = document.createTextNode(episode.listedName)
        episodeBtnEl.append(episodeNameTextNode) 
        episodeEl.append(episodeBtnEl)
        this.fragment.append(episodeEl)
    }

    

    createMortyEpisodeMessage(selectedEpisode:EpisodeInterface): string{
        const episodeCode = selectedEpisode.episode
        const eLetterIndex = episodeCode.indexOf('E')
        const episodeNumber = episodeCode.slice(eLetterIndex+1)
        const seasonNumber = episodeCode.slice(1, eLetterIndex)
        const mortyEpisodeMessages = [
            `Hey, you really nailed it with "${selectedEpisode.name}"! It's Episode ${episodeNumber} of Season ${seasonNumber}, aired on ${selectedEpisode.air_date}. Buckle up for a wild ride! But, uh, I can't spill all the cosmic beans 'cause, well, I'm just Morty, and this website's got limits, y'know?`,
          
            `Uh, you're in for "${selectedEpisode.name}," Episode ${episodeNumber} of Season ${seasonNumber}, from ${selectedEpisode.air_date}. Hope you're ready for this. But, um, just so you know, I can't go all spoiler-y 'cause I'm just Morty and, uh, it's not in my coding, y'know?`,
          
            `Oh man, you picked "${selectedEpisode.name}," Episode ${episodeNumber} of Season ${seasonNumber}, aired on ${selectedEpisode.air_date}. Hope you're brave 'cause this one's a rollercoaster. Just, uh, I can't give you all the details 'cause, well, I'm Morty, not some cosmic encyclopedia.`,
          
            `Hey, you're diving into "${selectedEpisode.name}," Episode ${episodeNumber} of Season ${seasonNumber}, aired on ${selectedEpisode.air_date}. Who knows what's in store? But, uh, don't expect me to spill the cosmic beans I'm Morty, not a walking spoiler.`,
          
            `Woah, you're up for "${selectedEpisode.name}", Episode ${episodeNumber} of Season ${seasonNumber}, aired on ${selectedEpisode.air_date}. Get ready for a crazy adventure! I'd love to give you all the juicy details, but, y'know, I'm just Morty, not a cosmic know-it-all.`,
          
            `Oh, uh, hey there! You're about to check out "${selectedEpisode.name}" that's Episode ${episodeNumber} of Season ${seasonNumber}, airing on ${selectedEpisode.air_date}. I mean, whoa, right? But, uh, I can't spill all the cosmic beans, y'know? 'Cause I'm just Morty, and, uh, this website's got some limits.`,
          
            `Whoa, nice choice with "${selectedEpisode.name}"! It's Episode ${episodeNumber} of Season ${seasonNumber}, and it aired on ${selectedEpisode.air_date}. Prepare for, like, epicness! But, uh, I can't be the spoiler guy 'cause, y'know, I'm just Morty and, uh, I don't have those powers.`,
          
            `Hey, check it out "${selectedEpisode.name}", Episode ${episodeNumber} of Season ${seasonNumber}, aired on ${selectedEpisode.air_date}! Get ready for a real adventure! Oh, and, uh, sorry, but I can't go all "Mr. Spoiler" 'cause, y'know, I'm just Morty and, uh, that's not my gig.`,
          
            `Um, so, you're diving into "${selectedEpisode.name}", Episode ${episodeNumber} of Season ${seasonNumber}, from ${selectedEpisode.air_date}. Yeah, pretty wild, huh? But, uh, I can't spill all the cosmic beans 'cause, well, I'm Morty, not some, like, cosmic bean-spilling guru.`,
          
            `Wow, "${selectedEpisode.name}" is your pick Episode ${episodeNumber} of Season ${seasonNumber}, originally aired on ${selectedEpisode.air_date}. Time for some, uh, adventure, I guess! But, um, I can't give you all the inside scoop 'cause, y'know, I'm just Morty, not a super-secret plot decoder.`
          ]

        const randomIndex = getRandomNum(mortyEpisodeMessages.length-1)
        const mortyEpisodeMessage = mortyEpisodeMessages[randomIndex]
        return mortyEpisodeMessage
    }

    getSelectedEpisode(target:EventTarget): EpisodeInterface | void{
        const targetEl = target as HTMLElement
        if(targetEl.tagName != "BUTTON") return
        const episodeId = targetEl.dataset.episodeId
        const selectedEpisode = this.loadedEpisodes.filter(episode=>{
            return episode.id === parseInt(episodeId!) 
        })[0]
        return selectedEpisode
    }

    renderSelectedEpisodeData(target:EventTarget){
        this.mainInfoContainer!.textContent = ""

        this.renderedCharacters = null
        const selectedEpisode = this.getSelectedEpisode(target)
        const mortyEpisodeMessage = this.createMortyEpisodeMessage(selectedEpisode!) 
        const episodeDetails = document.createElement('div')
        episodeDetails.classList.add('episode__details', 'd-flex', 'p-5')
        const episodeText = document.createElement('p')
        episodeText.classList.add('episode__details__text', 'd-flex', 'align-items-center', 'px-5')


        
        const mortyImage = document.createElement('img')
        mortyImage.src = "../assets/images/morty_gif.gif"
        mortyImage.alt = "Morty Talking"
        episodeText.textContent = mortyEpisodeMessage

        episodeDetails.append(episodeText)
        episodeDetails.append(mortyImage)
        this.mainInfoContainer?.append(episodeDetails)
        this.renderNewEpisodeCharacters(selectedEpisode!) 
    }


    async renderNewEpisodeCharacters(selectedEpisode: EpisodeInterface){
        await this.getCharactersObjects(selectedEpisode)
        
        this.renderCharacters()
        this.setCharactersInfiniteScroll()
    }

    async getCharactersObjects(selectedEpisode: EpisodeInterface){
        this.charactersList.charactersList = null
        await this.charactersList.createCharactersObjects(this.api, selectedEpisode.characters) 
        this.unrenderedCharacters = [...this.charactersList.charactersList]
    }
    
    async getCharactersObjectsForLocation(selectedLocation: LocationInterface){ 
        this.charactersList.charactersList = null
        await this.charactersList.createCharactersObjects(this.api, selectedLocation!.residents) 
        this.unrenderedCharacters = [...this.charactersList.charactersList] 
    }

    renderCharacters(){
        let charactersPerLoad = this.charactersPerLoad
        let charactersIterator = 0

        if(this.charactersPerLoad > this.unrenderedCharacters!.length) charactersPerLoad = this.unrenderedCharacters!.length

        while(charactersIterator < charactersPerLoad){
            this.renderCharacter(this.unrenderedCharacters![charactersIterator])
            charactersIterator++
        }
        this.mainInfoContainer?.append(this.characterCardsFragment)
        this.unrenderedCharacters?.splice(0, charactersPerLoad) 
    }

    renderCharacter(character:CharacterInterface){
        const characterCard: HTMLElement = this.characterCardTemplate.querySelector('[data-type="characterCard"]')! 
        characterCard.dataset.characterId = character.id.toString() 

        const characterImageEl:HTMLImageElement = characterCard.querySelector('[data-type="characterCardImage"]')! 
        characterImageEl.src = character.image

        const characterNameEl = characterCard.querySelector('[data-type="characterCardName"]')! 
        characterNameEl.textContent = character.name

        const characterSpeciesEl = characterCard.querySelector('[data-type="characterCardSpecies"]')! 
        characterSpeciesEl.textContent = character.species

        const characterStatusEl = characterCard.querySelector('[data-type="characterCardStatus"]')! 
        characterStatusEl.textContent = character.status 

        const templateClone = document.importNode(this.characterCardTemplate!, true) 
        this.characterCardsFragment.append(templateClone)
        this.renderedCharacters?.push(character)
    }

    setSideBarInfiniteScroll() {
        const observer = new IntersectionObserver(
                entries => {
               this.handleSideBarIntersection(observer, entries)
            } 
        );
    
        this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child')!
        observer.observe(this.lastLoadedEpisodeEl)
    }

    async handleSideBarIntersection(observer:any, entries:any){
        if (entries[0].isIntersecting) {
            observer.unobserve(entries[0].target)
            await this.addEpisodesToList()
            
            this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child')!
            if (this.api.episodesURL) observer.observe(this.lastLoadedEpisodeEl)
        }
    }
    
    setCharactersInfiniteScroll(){
        const observer = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){ 
                observer.unobserve(entries[0].target)
                this.renderCharacters()
                this.lastLoadedCharacterEl = document.querySelector('[data-type="characterCard"]:last-child')!
                if(this.unrenderedCharacters) observer.observe(this.lastLoadedCharacterEl)  
            }
        })
        this.lastLoadedCharacterEl = document.querySelector('[data-type="characterCard"]:last-child')!
        observer.observe(this.lastLoadedCharacterEl)
    }

    connectModalBtn(){
        this.modal.modalOriginBtn.addEventListener('click', ()=>{
            this.renderSelectedLocationData()
        })
    }

    

    async renderSelectedLocationData(){
        const locationData = await this.getSelectedLocationData()
        const rickLocationMessage = this.createRickLocationMessage(locationData)

        this.mainInfoContainer!.textContent = ""

        this.renderedCharacters = null
        const locationDetails = document.createElement('div')
        locationDetails.classList.add('location__details', 'd-flex', 'p-5')
        const locationText = document.createElement('p')
        locationText.classList.add('location__details__text', 'd-flex', 'align-items-center', 'px-5')
        
        const mortyImage = document.createElement('img')
        mortyImage.src = "../assets/images/morty_gif.gif"
        mortyImage.alt = "Morty Talking"
        locationText.textContent = rickLocationMessage

        locationDetails.append(locationText)
        locationDetails.append(mortyImage)
        this.mainInfoContainer?.append(locationDetails)
        
        
        this.renderNewLocationCharacters(locationData)
    }

    async renderNewLocationCharacters(selectedLocation: LocationInterface){
        await this.getCharactersObjectsForLocation(selectedLocation)
        
        this.renderCharacters()
        this.setCharactersInfiniteScroll()
    }

    async getSelectedLocationData(){
        const locationData = await this.api.getLocationData(this.modal.currentCharacterLocationId)
        return locationData
    }

    
    createRickLocationMessage(selectedLocation:LocationInterface): string{
        const rickLocationMessages = [
            `Oh jeez, you've stumbled upon "${selectedLocation.name}"? This place is a total ${selectedLocation.type} in the ${selectedLocation.dimension} dimension. Look, I'd give you the grand tour, but, uh, this isn't a travel agency, Morty. So, y'know, figure it out.`,
          
            `Morty, get ready for "${selectedLocation.name}".A real ${selectedLocation.type} hangout in the ${selectedLocation.dimension} dimension. Yeah, yeah, I know you want all the info, but, uh, this isn't a museum, buddy. Just soak it in.`,
          
            `Great, Morty, you found "${selectedLocation.name}".A ${selectedLocation.type} joint in the ${selectedLocation.dimension} dimension. I'd love to enlighten you, but, uh, this isn't school. Don't expect me to be your tour guide, Morty.`,
          
            `Well, well, well, look at you discovering "${selectedLocation.name}". A prime ${selectedLocation.type} spot in the ${selectedLocation.dimension} dimension. Don't ask me for all the deets, Morty. This isn't a chit-chat show.`,
          
            `Morty, you've hit up "${selectedLocation.name}".A ${selectedLocation.type} delight in the ${selectedLocation.dimension} dimension. I mean, sure, I could explain, but who needs that? It's not like I'm a tour guide, pal.`,
          
            `Whoa, Morty, you're in for "${selectedLocation.name}".A top-notch ${selectedLocation.type} place in the ${selectedLocation.dimension} dimension. I know you want a rundown, but this isn't a PowerPoint presentation, Morty.`,
          
            `Check it out, Morty. A${selectedLocation.name}" is a mind-blowing ${selectedLocation.type} joint in the ${selectedLocation.dimension} dimension. I could give you all the deets, but, y'know, I'm not a walking travel brochure.`,
          
            `Listen up, Morty! "${selectedLocation.name}" is a freakin' ${selectedLocation.type} spot in the ${selectedLocation.dimension} dimension. Don't expect me to be your GPS, Morty. Figure it out.`,
          
            `Oh geez, Morty, you've landed at "${selectedLocation.name}".A real ${selectedLocation.type} hub in the ${selectedLocation.dimension} dimension. I know you want the lowdown, but I'm not a virtual assistant, Morty.`,
          
            `Morty, you've just hit "${selectedLocation.name}".A primo ${selectedLocation.type} location in the ${selectedLocation.dimension} dimension. Don't ask me for a full report, Morty. I'm not here to narrate your adventures.`
          ];
        const randomIndex = getRandomNum(rickLocationMessages.length-1)
        const rickLocationMessage = rickLocationMessages[randomIndex]
        return rickLocationMessage
    }
    
    connectEpisodeBtns(){
        this.sideBarChaptersContainer?.addEventListener('click', (event)=>{
            if(event.target && event.target!.tagName === 'BUTTON')
            this.renderSelectedEpisodeData(event.target) 
        })
    }
    connectModalEpisodeBtns(){
        this.modal.accordionBodyEl.addEventListener('click', (event:any)=>{
            if(event.target && event.target.tagName === 'BUTTON')
            this.renderSelectedEpisodeData(event.target)
        })
    }
}

