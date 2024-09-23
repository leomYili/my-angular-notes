const { dataStore } = options;

dataStore.observableObj({ key: 'table', target: dataControl.value });
console.log(dataStore.get('table'));