import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { prefListStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';

export default class PrefList extends LightningElement {
  isListShow;
  prefList = new Set();
  sizePrefList = 0;

  constructor() {
    super();
    this.storageCallbackBind = this.storageCallback.bind(this);
    prefListStorage.subscribe(this.storageCallback.bind(this));
  }

  disconnectedCallback() {
    prefListStorage.unsubscribe(this.storageCallbackBind);
  }

  storageCallback(dataForSubs) {
    this.prefList = dataForSubs.prefList;
    this.sizePrefList = this.prefList.size;
  }

  showListHandler() {
    this.isListShow = true;
  }

  closeBucketHandler() {
    this.isListShow = false;
  }

  saveChosenFilms() {
    if (this.prefList.size > 0) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Success!',
          message: 'List was saved',
          variant: 'success',
        })
      );
    } else {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Warning!',
          message: 'You cannot save empty list',
          variant: 'warning',
        })
      );
    }
  }

  viewFilmInfo(event) {
    dispatcher.dispatch({ type: 'VIEW-FILM-CARD', payload: { isShowDeleteBtn: true, recordId: event.target.dataset.value } });
  }

  deleteFromPrefList(event) {
    dispatcher.dispatch({ type: 'DELETE-FILM-FROM-LIST', payload: event.target.dataset.value });
  }
}
