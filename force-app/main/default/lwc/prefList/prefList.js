import { LightningElement } from 'lwc';
import { prefListStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';

export default class PrefList extends LightningElement {
  isListShow;
  prefList = [];

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
  }

  showBucketHandler() {
    this.isListShow = true;
  }

  closeBucketHandler() {
    this.isListShow = false;
  }

  viewContactInfo(event) {
    dispatcher.dispatch({ type: 'VIEW-CONTACT-CARD', payload: { isShowDeleteBtn: true, recordId: event.target.dataset.value } });
  }

  deleteFromPrefList(event) {
    dispatcher.dispatch({ type: 'DELETE-CONTACT-FROM-LIST', payload: event.target.dataset.value });
  }
}
