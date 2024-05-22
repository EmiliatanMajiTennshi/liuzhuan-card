import { Table } from "antd";
import React from "react";
import { ITableConfig } from "../AdvancedSearchCom/AdvancedSearchCom";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [];

const AdvancedSearchTable = (props: {
  tableConfig: ITableConfig;
  searchedData: any[];
}) => {
  const { tableConfig, searchedData } = props;
  const { columns } = tableConfig;
  return (
    <div style={{ marginTop: 20 }}>
      <Table
        columns={columns}
        dataSource={searchedData}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default AdvancedSearchTable;
