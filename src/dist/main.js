var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Api } from "./api.js";
import { EpisodesList } from "./episodesList.js";
import { Dom } from "./dom.js";
import { CharactersList } from "./charactersList.js";
import { Modal } from "./modal.js";
window.addEventListener('load', init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = new Api;
        const episodesList = new EpisodesList;
        const charactersList = new CharactersList;
        const modal = new Modal(api, episodesList);
        const dom = new Dom(episodesList, api, charactersList, modal);
        yield dom.addEpisodesToList();
        dom.connectEpisodeBtns();
        dom.setSideBarInfiniteScroll();
        modal.connectModal();
        dom.connectModalBtn();
        dom.connectModalEpisodeBtns();
    });
}
//# sourceMappingURL=main.js.map