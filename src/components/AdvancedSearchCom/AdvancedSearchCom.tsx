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
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  tableConfig: ITableConfig;
}
const AdvancedSearchCom = (props: IAdvancedSearchCom) => {
  const { formConfig, tableConfig } = props;
  const [searchParams, setSearchParams] = useState<object>({});
  const _formConfig =
    typeof formConfig === "function" ? formConfig() : formConfig;
  const api = _formConfig.api;

  return (
    <div>
      {formConfig && (
        <AdvancedSearchForm
          formConfig={formConfig}
          setSearchParams={setSearchParams}
        ></AdvancedSearchForm>
      )}
      {tableConfig && (
        <AdvancedSearchTable
          tableConfig={tableConfig}
          api={api}
          searchParams={searchParams}
        ></AdvancedSearchTable>
      )}
    </div>
  );
};

export default AdvancedSearchCom;
