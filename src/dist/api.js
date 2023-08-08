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
        this.charactersURL = "https://rickandmortyapi.com/api/character";
        this.locationsURL = "https://rickandmortyapi.com/api/location";
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
}
//# sourceMappingURL=api.js.map