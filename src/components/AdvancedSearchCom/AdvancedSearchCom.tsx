import React, { useState } from "react";
import { AdvancedSearchForm } from "../AdvancedSearchForm";
import { AdvancedSearchTable } from "../AdvancedSearchTable";
import { Rule } from "antd/es/form";

export interface IFormItem {
  key: string;
  name: string;
  children: JSX.Element;
  rules?: Rule[];
}
export interface IFormConfig {
  api: string;
  span?: number;
  formItems: IFormItem[];
}

export interface ITableItem {
  title: string;
  dataIndex: string;
}

export interface ITableConfig {
  columns: ITableItem[];
}

interface IAdvancedSearchCom {
  formConfig?: IFormConfig;
  tableConfig?: ITableConfig;
}
const AdvancedSearchCom = (props: IAdvancedSearchCom) => {
  const { formConfig, tableConfig } = props;
  const [searchedData, setSearchedData] = useState<any[]>([]);
  return (
    <div>
      {formConfig && (
        <AdvancedSearchForm
          formConfig={formConfig}
          setSearchedData={setSearchedData}
        ></AdvancedSearchForm>
      )}
      {tableConfig && (
        <AdvancedSearchTable
          tableConfig={tableConfig}
          searchedData={searchedData}
        ></AdvancedSearchTable>
      )}
    </div>
  );
};

export default AdvancedSearchCom;
