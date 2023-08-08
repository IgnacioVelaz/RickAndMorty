var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Dom {
    constructor(episodesList, api) {
        this.episodesListEl = document.querySelector('#episodes__list');
        this.episodesList = episodesList;
        this.api = api;
        this.fragment = document.createDocumentFragment();
        this.lastLoadedEpisodeEl = null;
    }
    getEpisodesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const episodesObjects = yield this.episodesList.createEpisodesObjects(this.api);
            return episodesObjects;
        });
    }
    addEpisodesToList() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.api.episodesURL) {
                const episodesObjects = yield this.getEpisodesList();
                episodesObjects.forEach(episode => {
                    this.addEpisodeToList(episode);
                });
                (_a = this.episodesListEl) === null || _a === void 0 ? void 0 : _a.append(this.fragment);
            }
        });
    }
    addEpisodeToList(episode) {
        return __awaiter(this, void 0, void 0, function* () {
            const episodeEl = document.createElement('li');
            episodeEl.classList.add('nav-item', 'p-3');
            episodeEl.dataset.type = 'navBarEpisode';
            const episodeBtnEl = document.createElement('button');
            episodeBtnEl.classList.add('navBar__episode__btn', 'py-3');
            const episodeNameTextNode = document.createTextNode(episode.listedName);
            episodeBtnEl.append(episodeNameTextNode);
            episodeEl.append(episodeBtnEl);
            this.fragment.append(episodeEl);
        });
    }
    setInfiniteScroll() {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log(entries[0].target);
                observer.unobserve(entries[0].target);
                this.addEpisodesToList();
                this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child');
                if (this.api.episodesURL)
                    observer.observe(this.lastLoadedEpisodeEl);
            }
        });
        this.lastLoadedEpisodeEl = document.querySelector('[data-type="navBarEpisode"]:last-child');
        observer.observe(this.lastLoadedEpisodeEl);
    }
}
//# sourceMappingURL=dom.js.map