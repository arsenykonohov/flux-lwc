import { LightningElement } from 'lwc';
import { contactCardStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';
export default class ContactCard extends LightningElement {
  contactRecord;
  isShowContactCard;
  isShowDeleteBtn;

  constructor() {
    super();
    this.storageCallbackBind = this.storageCallback.bind(this);
    contactCardStorage.subscribe(this.storageCallbackBind);
  }

  disconnectedCallback() {
    contactCardStorage.unsubscribe(this.storageCallbackBind);
  }

  storageCallback(dataForSubs) {
    this.isShowContactCard = true;
    this.contactRecord = dataForSubs.contactRecord;
    this.isShowDeleteBtn = dataForSubs.isShowDeleteBtn;
  }

  addToPreferencesHandler() {
    this.isShowContactCard = false;
    dispatcher.dispatch({ type: 'ADD-TO-PREF-LIST', payload: this.contactRecord.Id });
  }

  deleteFromPrefList(event) {
    this.isShowContactCard = false;
    dispatcher.dispatch({ type: 'DELETE-CONTACT-FROM-LIST', payload: this.contactRecord.Id });
  }

  closeContactCard() {
    this.isShowContactCard = false;
  }
}
