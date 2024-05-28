import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { ITableConfig } from "../AdvancedSearchCom/AdvancedSearchCom";
import { requestLz } from "@/utils";

const AdvancedSearchTable = (props: {
  tableConfig: ITableConfig;
  api: string;
  searchParams: object;
}) => {
  const { tableConfig, api, searchParams } = props;
  const { columns } = tableConfig;
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setLoading(true);
    requestLz
      .post(api, { ...searchParams, pageSize: pageSize, pageNum: currentPage })
      .then(
        (res: {
          data: {
            data: any[];
            totalCount: number;
          };
        }) => {
          setSearchedData(res.data.data);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        }
      )
      .catch((err) => {
        setLoading(false);
        console.log("请求列表数据时发生错误", err);
        message.error({
          content: `数据请求失败，${err?.message}`,
          style: { marginTop: "40vh" },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, searchParams, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  return (
    <div style={{ marginTop: 20 }}>
      <Table
        columns={columns}
        dataSource={searchedData}
        size="small"
        pagination={{
          total: totalCount,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        loading={loading}
      />
    </div>
  );
};

export default AdvancedSearchTable;
