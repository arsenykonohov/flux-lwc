import { LightningElement } from 'lwc';
import { contactCardStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';
export default class ContactCard extends LightningElement {
  contactRecord;

  constructor() {
    super();
    contactCardStorage.subscribe(this.storageCallback.bind(this));
  }

  storageCallback(dataForSubs) {
    console.log(dataForSubs);
    this.contactRecord = dataForSubs.contactRecord;
  }
}
