class TableStore {
  value = [];

  constructor() {
    dataStore.makeAutoObservable(this);
  }

  increment2(array) {
    this.value = array;
  }
}

const doubler = new TableStore();

