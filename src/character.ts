import { CharacterInterface, CharacterStatus, CharacterGender } from "./types/characterInterface"

export class Character {
    id: number
    name: string
    status: CharacterStatus
    species: string
    type: string
    gender: CharacterGender
    origin: string // Add location interface once its done
    image: string
    episode: string[]
    url: string
    created: string
    constructor({id, name, status, species, type, gender, origin, image, episode, url, created}:CharacterInterface){
        this.id = id
        this.name = name
        this.status = status
        this.species = species
        this.type = type
        this.gender = gender
        this.origin = origin
        this.image = image
        this.episode = episode
        this.url = url
        this.created = created
    }
}

