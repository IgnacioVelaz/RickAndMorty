import { Api } from "./api.js"
import { EpisodesList } from "./episodesList.js"
import { Dom } from "./dom.js"
import { CharactersList } from "./charactersList.js"
import { Modal } from "./modal.js"


window.addEventListener('load', init)

async function init(){
    const api = new Api
    const episodesList = new EpisodesList
    const charactersList = new CharactersList
    const modal = new Modal(api, episodesList)
    const dom = new Dom(episodesList, api, charactersList, modal)
    
    
    await dom.addEpisodesToList()

    dom.connectEpisodeBtns()
    dom.setSideBarInfiniteScroll()
    modal.connectModal()
    dom.connectModalBtn()
    dom.connectModalEpisodeBtns()
}

