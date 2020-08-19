import { LightningElement } from 'lwc';
import { tableStorage } from 'c/storages';
import { dispatcher } from 'c/dispatcher';

export default class DataTable extends LightningElement {
  columnData;
  cellsData;
  currentPage;
  lastPage;
  isPrevBtnDisabled;
  isNextBtnDisabled;

  constructor() {
    super();
    tableStorage.subscribe(this.storageCallback.bind(this));
    dispatcher.dispatch({ type: 'INIT' });
  }

  storageCallback(dataFromStorage) {
    this.cellsData = dataFromStorage.cellsData;
    this.columnData = dataFromStorage.columnData;
    this.lastPage = dataFromStorage.lastPage;
    this.currentPage = dataFromStorage.currentPage;

    if (this.currentPage === 1) this.isPrevBtnDisabled = true;
    else this.isPrevBtnDisabled = false;

    if (this.currentPage === this.lastPage) this.isNextBtnDisabled = true;
    else this.isNextBtnDisabled = false;
  }

  prevHandler() {
    dispatcher.dispatch({ type: 'PREV-PAGE' });
  }

  nextHandler() {
    dispatcher.dispatch({ type: 'NEXT-PAGE' });
  }

  clickOnRowHandler(event) {
    console.log(JSON.parse(JSON.stringify(event)));
  }
}
