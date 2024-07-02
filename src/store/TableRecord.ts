import { makeAutoObservable, runInAction } from "mobx";

class TableRecord {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  tableRecord = {};
  setTableRecord(record: any) {
    runInAction(() => {
      this.tableRecord = record;
    });
  }
}

export default TableRecord;
