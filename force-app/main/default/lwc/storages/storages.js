import getContacts from '@salesforce/apex/StorageController.getContacts';
class Storage {
  subscribers = [];
  storage = {};
  cache = {};

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  _sendDataToSubs(storage) {
    this.subscribers.forEach((cb) => cb(storage));
  }

  changeStorageData(data) {
    this.storage = { ...this.storage, ...data };
  }

  initComponent() {
    this._sendDataToSubs(this.storage);
  }

  memoize(func) {
    return async (args) => {
      const cacheKey = JSON.stringify(args);

      if (Object.keys(this.cache).includes(cacheKey) === false) {
        this.cache[cacheKey] = await func(args);
        return this.cache[cacheKey];
      } else {
        return Promise.resolve(this.cache[cacheKey]);
      }
    };
  }
}

class TableStorage extends Storage {
  constructor() {
    super();
    this.storage.currentPage = 1;
    this.storage.pageSize = 5;
    this._dispatchRequest = this.memoize(this._dispatchRequest.bind(this));
  }

  async nextPage() {
    this.storage.currentPage++;
    this.changeStorageData(
      await this._dispatchRequest({ params: this.params })
    );
    this._sendDataToSubs(this.storage);
  }

  async prevPage() {
    this.storage.currentPage--;
    this.changeStorageData(
      await this._dispatchRequest({ params: this.params })
    );
    this._sendDataToSubs(this.storage);
  }

  async _dispatchRequest(params) {
    return getContacts(params).then((result) => {
      const storage = {};
      storage.tableData = result;
      storage.columnData = result.columnData;
      storage.lastPage = Math.ceil(
        result.amountOfRecords / params.params.pageSize
      );

      storage.cellsData = result.cellsData.map((record) => {
        return storage.columnData.reduce((acc, field) => {
          acc[field] = record[field];

          return acc;
        }, {});
      });

      return storage;
    });
  }

  async initComponent() {
    this.changeStorageData(await this._dispatchRequest({ params: this.params }));
    this._sendDataToSubs(this.storage);
  }

  get params() {
    return {
      pageSize: this.storage.pageSize,
      currentPage: this.storage.currentPage - 1,
    };
  }
}

const tableStorage = new TableStorage();

export { tableStorage };
