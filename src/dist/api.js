var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor() {
        this.episodesURL = "https://rickandmortyapi.com/api/episode?page=1";
        this.charactersURL = "https://rickandmortyapi.com/api/character/";
        this.locationsURL = "https://rickandmortyapi.com/api/location/";
        this.episodeURL = "https://rickandmortyapi.com/api/episode/";
    }
    getEpisodesData() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.episodesURL);
            const data = yield res.json();
            const { results: episodesDataArray, info: { next: nextEpisodesURL } } = data;
            this.episodesURL = nextEpisodesURL;
            return episodesDataArray;
        });
    }
    getSpecificEspisodesData(episodesIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const episodesIdsString = episodesIds.join(',');
            const res = yield fetch(`${this.episodeURL}${episodesIdsString}`);
            const data = yield res.json();
            return data;
        });
    }
    getCharactersData(charactersIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const characterIdsString = charactersIds.map(characterId => characterId.toString().replace(this.charactersURL, "")).join(',');
            const res = yield fetch(`${this.charactersURL}${characterIdsString}`);
            const data = yield res.json();
            return data;
        });
    }
    getCharacterData(characterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.charactersURL}${characterId}`);
            const data = yield res.json();
            return data;
        });
    }
    getLocationData(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.locationsURL}${locationId}`);
            const data = yield res.json();
            return data;
        });
    }
}
//# sourceMappingURL=api.js.map