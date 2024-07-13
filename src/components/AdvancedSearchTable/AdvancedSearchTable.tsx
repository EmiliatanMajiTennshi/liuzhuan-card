import { ConfigProvider, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  IAdvancedSearchTable,
  ITableConfigProps,
} from "./AdvancedSearchTableType";
import getApi from "@/api";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
import { throttle } from "lodash";

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

  // 查询到的数据
  const [searchedData, setSearchedData] = useState<any[]>([]);
  // 查询到的数据总数
  const [totalCount, setTotalCount] = useState(0);
  // 当前页码
  const [currentPage, setCurrentPage] = useState(1);
  // 页面大小
  const [pageSize, setPageSize] = useState(5);
  // 下发模态框
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  // 下发id
  const [issueID, setIssueID] = useState(0);
  // 窗口大小 用来监听窗口变化
  const [screenW, setScreenW] = useState(
    document.documentElement.clientWidth || document.body.clientWidth
  );

  const tableRef = useRef<any>(null);

  /**
   * 传给config里的tableConfig
   */
  const tableProps: ITableConfigProps = {
    setSearchedData,
    searchedData,
    setRefreshFlag,
    setIssueModalOpen,
    setIssueID,
  };

  const _tableConfig =
    typeof tableConfig === "function" ? tableConfig(tableProps) : tableConfig;

  const { columns, api, rowKey, selectAble } = _tableConfig;

  const currentRequest = getApi(api);
  const params = { ...searchParams, pageSize: pageSize, pageNum: currentPage };
  useEffect(() => {
    //请求数据
    const fetchData = async () => {
      try {
        setLoading(true);
        setSelectedRowKeys([]);
        const res = await currentRequest(params);
        const currentData = res?.data?.data;
        if (currentData) {
          setSearchedData(currentData);
          setTotalCount(res?.data?.page?.total);
        } else if (res?.data?.code === 20000) {
          message.info({
            content: `没有找到符合条件的数据`,
            style: { marginTop: "40vh" },
          });
          setSearchedData([]);
        } else {
          throw new Error(`数据请求失败，${res.message}`);
        }
      } catch (error: any) {
        console.error("请求列表数据时发生错误", error);
        message.error({
          content: error?.message,
          style: { marginTop: "40vh" },
        });
        setSearchedData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, searchParams, currentPage, pageSize, refreshFlag]);

  // 用来修复antdTable fixed:right出现的对不齐bug
  const handleWindowResize = () => {
    setScreenW(
      document.documentElement.clientWidth || document.body.clientWidth
    );
  };

  const throttleResize = throttle(handleWindowResize, 300);
  useEffect(() => {
    //组件渲染后添加
    window.addEventListener("resize", throttleResize);
    //组件卸载后移除
    return () => {
      window.removeEventListener("resize", throttleResize);
    };
  }, []);

  useEffect(() => {
    const parentNode = tableRef?.current?.parentNode;
    const tableBody = parentNode?.querySelector(".ant-table-body");
    const operateCell = parentNode?.querySelector(
      ".ant-table-cell-fix-right-first"
    );
    if (!parentNode || !operateCell || !tableBody) return;
    if (tableBody?.scrollHeight === tableBody?.clientHeight) {
      operateCell.style.right = 0;
    } else {
      operateCell.style.right = "6px";
    }
  }, [screenW]);

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
          ref={tableRef}
          scroll={{ y: 240 }} // 240随便打的 用css改了
          pagination={{
            total: totalCount,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
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
      {issueModalOpen && (
        <Modal
          open={issueModalOpen}
          onCancel={() => setIssueModalOpen(false)}
          footer={null}
          width={1400}
        >
          <ProductionProcessFlowCardAndDispatchList issueID={issueID} />
        </Modal>
      )}
    </div>
  );
};

export default AdvancedSearchTable;
