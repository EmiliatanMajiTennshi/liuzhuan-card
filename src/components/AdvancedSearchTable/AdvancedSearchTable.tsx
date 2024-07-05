import { ConfigProvider, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  IAdvancedSearchTable,
  ITableConfigProps,
  TTableErr,
  TTableRes,
} from "./AdvancedSearchTableType";
import getApi from "@/api";

const AdvancedSearchTable = (props: IAdvancedSearchTable) => {
  const {
    tableConfig,
    searchParams,
    loading,
    setLoading,
    selectedRowKeys,
    setSelectedRowKeys,
    refreshFlag,
    setRefreshFlag,
  } = props;

  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 传给config里的tableConfig
  const tableProps: ITableConfigProps = {
    setSearchedData,
    searchedData,
    setRefreshFlag,
  };

  const _tableConfig =
    typeof tableConfig === "function" ? tableConfig(tableProps) : tableConfig;
  const { columns, api, rowKey, selectAble } = _tableConfig;
  const currentRequest = getApi(api);
  const params = { ...searchParams, pageSize: pageSize, pageNum: currentPage };
  useEffect(() => {
    setLoading(true);
    setSelectedRowKeys([]);
    currentRequest(params).then((res: TTableRes & TTableErr) => {
      // 有currentData 说明请求成功了
      const isPaging = res?.data?.data?.page;
      console.log(res, 1112);

      const currentData = isPaging ? res?.data?.data?.data : res?.data?.data;
      if (currentData) {
        setSearchedData(currentData);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("请求列表数据时发生错误", res);
        message.error({
          content: `数据请求失败，${res.message}`,
          style: { marginTop: "40vh" },
        });
        setSearchedData([]);
      }
    });

    // request
    //   .get(api, {
    //     params: { ...searchParams, pageSize: pageSize, pageNum: currentPage },
    //   })
    //   .then(
    //     (res: {
    //       data: {
    //         data: any[];
    //         totalCount: number;
    //       };
    //     }) => {
    //       console.log(res, 123);

    //       setSearchedData(res.data.data);
    //       setTotalCount(res.data.totalCount);
    //       setLoading(false);
    //     }
    //   )
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log("请求列表数据时发生错误", err);
    //     message.error({
    //       content: `数据请求失败，${err?.message}`,
    //       style: { marginTop: "40vh" },
    //     });
    //     setSearchedData([]);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, searchParams, currentPage, pageSize, refreshFlag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const onSelectChange = (...props: any) => {
    const [newSelectedRowKeys, selectedRows] = props;

    console.log("selectedRowKeys changed: ", newSelectedRowKeys, selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 80,
  };

  return (
    <div style={{ height: "100%" }}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              /* 这里是你的组件 token */
              headerBorderRadius: 0,
              cellPaddingInlineMD: 12,
            },
          },
        }}
      >
        <Table
          rowSelection={selectAble ? rowSelection : undefined}
          rowKey={rowKey || "key"}
          columns={columns}
          dataSource={searchedData}
          size="middle"
          className={styles.table}
          scroll={{ y: 240 }} // 240随便打的 用css改了
          pagination={{
            total: totalCount,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            className: styles.pagination,
          }}
          loading={loading}
        />
      </ConfigProvider>
    </div>
  );
};

export default AdvancedSearchTable;
