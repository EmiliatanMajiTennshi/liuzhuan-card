import { makeAutoObservable, runInAction } from "mobx";

class TableRecord {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  tableRecord = {};
  setTableRecord(record) {
    runInAction(() => {
      this.tableRecord = record;
    });
  }
}

export default TableRecord;
