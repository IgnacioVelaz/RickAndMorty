class LocationClass{
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
    constructor({id, name, type, dimension, residents, url, created}: LocationInterface){
        this.id = id
        this.name = name
        this.type = type
        this.dimension = dimension
        this.residents = residents
        this.url = url
        this.created = created
    }
    
}