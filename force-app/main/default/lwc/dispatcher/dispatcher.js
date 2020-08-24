import { tableStorage, filmCardStorage, prefListStorage } from 'c/storages';
class Dispatcher {
  constructor() {
    this.dispatch = this._pipe(this._logger, this._dispatch);
  }

  _dispatch(action) {
    switch (action.type) {
      case 'INIT': {
        tableStorage.initComponent();
        break;
      }

      case 'SEARCH-FILMS': {
        console.log(action.payload);
        tableStorage.searchFilms(action.payload);
        break;
      }

      case 'CHANGE-PAGE': {
        tableStorage.changePage(action.payload);
        break;
      }

      case 'VIEW-FILM-CARD': {
        const filmRecord = tableStorage.getRecordById(action.payload.recordId);
        filmCardStorage.changeStorageDataAndSendToSubs({ isShowDeleteBtn: action.payload.isShowDeleteBtn, filmRecord: filmRecord });
        break;
      }

      case 'ADD-TO-PREF-LIST': {
        const filmRecord = tableStorage.getRecordById(action.payload);
        prefListStorage.addRecordToPrefListAndSendDataToSubs(filmRecord);
        break;
      }

      case 'DELETE-FILM-FROM-LIST': {
        prefListStorage.deleteRecordFromList(action.payload);
        break;
      }

      default:
        break;
    }
  }

  _logger(action) {
    switch (action.type) {
      case 'VIEW-FILM-CARD': {
        const filmRecord = tableStorage.getRecordById(action.payload.recordId);
        console.log(`${filmRecord.Name} was viewed`);
        break;
      }

      case 'ADD-TO-PREF-LIST': {
        const filmRecord = tableStorage.getRecordById(action.payload);
        console.log(`${filmRecord.Name} was added`);
        break;
      }

      case 'DELETE-FILM-FROM-LIST': {
        const filmRecord = tableStorage.getRecordById(action.payload);
        console.log(`${filmRecord.Name} was deleted`);
        break;
      }

      default:
        break;
    }
  }

  _pipe = (...funcs) => action => funcs.forEach(func => Promise.resolve(action).then(func));
}

export const dispatcher = new Dispatcher();
