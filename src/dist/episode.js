class Episode {
    constructor({ air_date, characters, created, episode, id, name, url }) {
        this.air_date = air_date;
        this.characters = characters;
        this.created = created;
        this.episode = episode;
        this.id = id;
        this.name = name;
        this.url = url;
    }
    get listedName() {
        return `${this.episode}: ${this.name}`;
    }
}
export default Episode;
//# sourceMappingURL=episode.js.map