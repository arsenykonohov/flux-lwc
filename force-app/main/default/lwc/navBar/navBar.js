import { LightningElement } from 'lwc';
import { dispatcher } from 'c/dispatcher';

export default class NavBar extends LightningElement {
  delayTimerForDispatchSearchName;

  searchInputHandler() {
    clearTimeout(this.delayTimerForDispatchSearchName);

    this.delayTimerForDispatchSearchName = setTimeout(() => {
      dispatcher.dispatch({ type: 'SEARCH-FILMS', payload: { searchName: this.searchInputValue } });
    }, 500);
  }

  get searchInputValue() {
    return this.template.querySelector('.search-input').value;
  }
}
