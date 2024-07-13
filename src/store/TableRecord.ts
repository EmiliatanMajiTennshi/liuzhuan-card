import { makeAutoObservable, runInAction } from "mobx";

/**
 * table的某条记录
 */
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
