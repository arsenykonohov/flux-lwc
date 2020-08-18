class Storage {
    subscribers = [];
    storage = {};

    subscribe(cb) {
        this.subscribers.push(cb);
    }

    sendData() {
        this.subscribers.forEach(cb => cb(this.storage));
    }
}

class TableStorage extends Storage {
    
}