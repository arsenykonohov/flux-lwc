import { LightningElement } from 'lwc';
import { prefListStorage } from 'c/storages';

export default class PrefList extends LightningElement {
  isListShow;
  prefList = [];

  constructor() {
    super();
    prefListStorage.subscribe(this.storageCallback.bind(this));
  }

  disconnectedCallback() {
    prefListStorage.unsubscribe(this.storageCallbackBind);
  }

  storageCallback(dataForSubs) {
    console.log(dataForSubs);
    this.prefList = [...dataForSubs.prefList];
  }

  storageCallbackBind = this.storageCallback.bind(this);

  showBucketHandler() {
    this.isListShow = true;
  }

  closeBucketHandler() {
    this.isListShow = false;
  }

  viewContactInfo(event) {
    dispatcher.dispatch({ type: 'VIEW-CONTACT-CARD', payload: event.target.dataset.value });
  }

  deleteFromPrefList(event) {}
}
