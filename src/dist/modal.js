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
export class Modal {
    constructor(api, episodesList) {
        this.modalEl = document.querySelector('#modal');
        this.api = api;
        this.modalTitleEl = this.modalEl.querySelector('#modalTitle');
        this.modalImageEl = this.modalEl.querySelector('#modalImage');
        this.modalStatusEl = this.modalEl.querySelector('#modalStatus');
        this.modalGenderEl = this.modalEl.querySelector('#modalGender');
        this.modalSpeciesEl = this.modalEl.querySelector('#modalSpecies');
        this.modalOriginBtn = this.modalEl.querySelector('#modalOrigin');
        this.currentCharacterLocationId = null;
        this.episodesList = episodesList;
        this.fragment = document.createDocumentFragment();
        this.accordionBodyEl = document.querySelector('#accordionBody');
    }
    connectModal() {
        var _a;
        (_a = this.modalEl) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.modal', (event) => {
            const target = event.relatedTarget;
            this.renderCharacterData(target);
        });
    }
    renderCharacterData(target) {
        return __awaiter(this, void 0, void 0, function* () {
            this.accordionBodyEl.textContent = "";
            const characterData = yield this.getSelectedCharacterData(target);
            const locationId = characterData.origin.url.replace(this.api.locationsURL, "");
            this.modalTitleEl.textContent = characterData.name;
            this.modalImageEl.src = characterData.image;
            this.modalImageEl.alt = `${characterData.name} avatar`;
            this.modalStatusEl.textContent = `Status: ${characterData.status}`;
            this.modalGenderEl.textContent = `Gender: ${characterData.gender}`;
            this.modalSpeciesEl.textContent = `Specie: ${characterData.species}`;
            this.modalOriginBtn.textContent = characterData.origin.name;
            if (locationId)
                this.modalOriginBtn.dataset.locationId = locationId;
            else if (this.modalOriginBtn.dataset.locationId)
                this.modalOriginBtn.removeAttribute('data-location-id');
            this.currentCharacterLocationId = locationId;
            yield this.renderAppearances(characterData);
        });
    }
    renderAppearances(character) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const loadedAppearances = yield this.addAppearances(character);
            const episodesListEl = document.createElement('ul');
            loadedAppearances.forEach(appearance => this.renderAppearance(appearance));
            episodesListEl.append(this.fragment);
            (_a = this.accordionBodyEl) === null || _a === void 0 ? void 0 : _a.append(episodesListEl);
        });
    }
    renderAppearance(appearance) {
        const modalEpisodeEl = document.createElement('li');
        modalEpisodeEl.classList.add('nav-item', 'p-3');
        modalEpisodeEl.dataset.type = 'modalEpisode';
        const modalEpisodeBtnEl = document.createElement('button');
        modalEpisodeBtnEl.classList.add('navBar__episode__btn', 'text-start', 'py-3', 'w-100');
        modalEpisodeBtnEl.dataset.episodeId = appearance.id.toString();
        modalEpisodeBtnEl.dataset.type = "sideBarEpisodeBtn";
        modalEpisodeBtnEl.dataset.bsDismiss = "modal";
        const episodeNameTextNode = document.createTextNode(appearance.listedName);
        modalEpisodeBtnEl.append(episodeNameTextNode);
        modalEpisodeEl.append(modalEpisodeBtnEl);
        this.fragment.append(modalEpisodeEl);
    }
    addAppearances(character) {
        return __awaiter(this, void 0, void 0, function* () {
            const appearancesIds = this.getAppearancesIds(character);
            const loadedAppearances = this.episodesList.renderedEpisodes.filter(episode => {
                return appearancesIds.includes(episode.id.toString());
            });
            const appearancesToLoad = appearancesIds.filter(id => !this.episodesList.renderedEpisodes.some(episode => episode.id.toString() === id));
            if (appearancesToLoad.length === 0)
                return loadedAppearances;
            let newEpisodes = yield this.api.getSpecificEspisodesData(appearancesToLoad);
            if (!Array.isArray(newEpisodes))
                newEpisodes = [newEpisodes];
            if (newEpisodes) {
                newEpisodes.forEach(episode => {
                    const episodeObject = new Episode(episode);
                    loadedAppearances.push(episodeObject);
                    this.episodesList.renderedEpisodes.push(episodeObject);
                });
            }
            return loadedAppearances;
        });
    }
    getAppearancesIds(character) {
        const appearancesIds = character.episode.map(episode => {
            return episode.replace(this.api.episodeURL, '');
        });
        return appearancesIds;
    }
    getSelectedCharacterData(target) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const characterId = (_a = target.closest('[data-type="characterCard"]')) === null || _a === void 0 ? void 0 : _a.dataset.characterId;
            const characterData = yield this.api.getCharacterData(characterId);
            return characterData;
        });
    }
}
//# sourceMappingURL=modal.js.map