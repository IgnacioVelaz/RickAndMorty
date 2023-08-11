var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Episode from "./episode.js";
export class EpisodesList {
    constructor() {
        this.createdEpisodes = [];
        this.renderedEpisodes = [];
    }
    createEpisodesObjects(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const episodesData = yield api.getEpisodesData();
            const episodesList = episodesData.map(episode => new Episode(episode));
            episodesList.forEach(episode => this.renderedEpisodes.push(episode));
            return episodesList;
        });
    }
}
//# sourceMappingURL=episodesList.js.map