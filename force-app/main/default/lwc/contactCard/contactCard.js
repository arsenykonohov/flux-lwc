import { LightningElement } from 'lwc';
import { contactCardStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';
export default class ContactCard extends LightningElement {
  contactRecord;
  isShowContactCard;

  constructor() {
    super();
    contactCardStorage.subscribe(this.storageCallbackBind);
  }

  disconnectedCallback() {
    contactCardStorage.unsubscribe(this.storageCallbackBind);
  }

  storageCallback(dataForSubs) {
    this.isShowContactCard = true;
    this.contactRecord = dataForSubs.contactRecord;
  }

  storageCallbackBind = this.storageCallback.bind(this);

  addToPreferencesHandler() {
    this.isShowContactCard = false;
    dispatcher.dispatch({ type: 'ADD-TO-PREF-LIST', payload: this.contactRecord.Id });
  }

  closeContactCard() {
    this.isShowContactCard = false;
  }
}
