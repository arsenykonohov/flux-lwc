import { tableStorage, contactCardStorage, prefListStorage } from 'c/storages';
class Dispatcher {
  dispatch(action) {
    switch (action.type) {
      case 'INIT': {
        tableStorage.initComponent();
        break;
      }

      case 'CHANGE-PAGE': {
        tableStorage.changePage(action.payload);
        break;
      }

      case 'VIEW-CONTACT-CARD': {
        const contactRecord = tableStorage.getRecordById(action.payload);
        contactCardStorage.changeStorageDataAndSendToSubs({ contactRecord: contactRecord });
        break;
      }

      case 'ADD-TO-PREF-LIST': {
        const contactRecord = tableStorage.getRecordById(action.payload);
        prefListStorage.addRecordToPrefListAndSendDataToSubs(contactRecord);
        break;
      }

      default:
        break;
    }
  }
}

export const dispatcher = new Dispatcher();
