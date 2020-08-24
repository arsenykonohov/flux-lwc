import { LightningElement } from 'lwc';
import { filmCardStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';

export default class FilmCard extends LightningElement {
  filmRecord;
  isShowFilmCard;
  isShowDeleteBtn;

  constructor() {
    super();
    this.storageCallbackBind = this.storageCallback.bind(this);
    filmCardStorage.subscribe(this.storageCallbackBind);
  }

  disconnectedCallback() {
    filmCardStorage.unsubscribe(this.storageCallbackBind);
  }

  storageCallback(dataForSubs) {
    this.isShowFilmCard = true;
    this.filmRecord = dataForSubs.filmRecord;
    this.isShowDeleteBtn = dataForSubs.isShowDeleteBtn;
  }

  addToPreferencesHandler() {
    this.isShowFilmCard = false;
    dispatcher.dispatch({ type: 'ADD-TO-PREF-LIST', payload: this.filmRecord.Id });
  }

  deleteFromPrefList() {
    this.isShowFilmCard = false;
    dispatcher.dispatch({ type: 'DELETE-FILM-FROM-LIST', payload: this.filmRecord.Id });
  }

  closeContactCard() {
    this.isShowFilmCard = false;
  }
}
