import { Api } from "./api.js"
import { EpisodesList } from "./episodesList.js"
import { Dom } from "./dom.js"


window.addEventListener('load', init)

async function init(){
    const api = new Api
    const episodesList = new EpisodesList
    const dom = new Dom(episodesList, api)
    
    await dom.addEpisodesToList()
    dom.setInfiniteScroll()
}

