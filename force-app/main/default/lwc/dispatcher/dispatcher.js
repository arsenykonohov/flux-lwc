import { tableStorage } from 'c/storages';
class Dispatcher {
  dispatch(action) {
    switch (action.type) {
      case 'INIT':
        tableStorage.initComponent();
        break;

      case 'PREV-PAGE':
        tableStorage.prevPage();
        break;

      case 'NEXT-PAGE':
        tableStorage.nextPage();
        break;

      default:
        break;
    }
  }
}

export const dispatcher = new Dispatcher();
