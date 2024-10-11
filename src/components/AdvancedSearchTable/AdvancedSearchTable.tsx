import {
  ConfigProvider,
  Empty,
  Modal,
  Spin,
  Table,
  Tabs,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  IAdvancedSearchTable,
  IIssueID,
  ITableConfigProps,
} from "./AdvancedSearchTableType";
import getApi, { queryfinishedProductsByOI, TApi } from "@/api";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
import {
  ERROR_MESSAGE,
  FIND_NO_DATA,
  GET_TABLE_OPTIONS_ERROR,
  SUCCESS_CODE,
} from "@/constants";

import { AnyObject } from "antd/es/_util/type";
import { cloneDeep } from "lodash";
import { getErrorMessage } from "@/utils";

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
  const [pageSize, setPageSize] = useState(10);
  // 下发模态框
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  // 打印
  const [printModalOpen, setPrintModalOpen] = useState(false);

  // 下发id
  const [issueID, setIssueID] = useState<IIssueID>({ orderid: "", itmid: "" });
  // 窗口大小 用来监听窗口变化
  // const [screenW, setScreenW] = useState(0);

  // table里的各种下拉选项
  const [tableOptions, setTableOptions] = useState<AnyObject>({});

  // 如果需要半品下发成品的搜索成品的参数
  const [finishedParams, setFinishedParams] = useState<AnyObject>({});

  // 32下发31时 成品存的数据
  const [finishedData32to31, setFinishedData32to31] = useState<AnyObject>({});
  // 32下发31时 半品存的数据
  const [unfinishedData32to31, setUnfinishedData32to31] = useState<AnyObject>(
    {}
  );
  // 31请求的数据
  const [finishedData, setFinishedData] = useState<AnyObject>({});

  // 确认成品=
  const [confirmFinished, setConfirmFinished] = useState("undo");
  // tab切换
  const [tabChangeFlag, setTabChangeFlag] = useState(false);
  // tab loading
  const [tabLoading, setTabLoading] = useState("finish");
  // // 鼠标所在行
  // const [hoveredRow, setHoveredRow] = useState(null);
  const tableRef = useRef<any>(null);
  // 首次是否加载
  const isFirstRender = useRef(true);
  /**
   * 传给config里的tableConfig
   */
  const tableProps: ITableConfigProps = {
    setSearchedData,
    searchedData,
    setRefreshFlag,
    setIssueModalOpen,
    setIssueID,
    setPrintModalOpen,
    tableOptions,
    setTableOptions,
    setFinishedParams,
  };

  const _tableConfig =
    typeof tableConfig === "function" ? tableConfig(tableProps) : tableConfig;

  const {
    columns,
    api,
    rowKey,
    selectAble,
    queryFlowCardApi,
    flowCardType,
    optionList,
    defaultParam,
    name,
    needIssueFinished,
    disableFirstLoading,
  } = _tableConfig;

  // 获取当前页面table数据的请求
  const currentRequest = getApi(api);
  const params = {
    // 默认参数
    ...defaultParam,
    // 搜索参数
    ...searchParams,
    pageSize: pageSize,
    pageNum: currentPage,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      setSelectedRowKeys([]);
      const res: any = await currentRequest(params);
      const currentData = res?.data?.data;
      if (res?.data && currentData) {
        setSearchedData(currentData);
        setTotalCount(res?.data?.page?.total || currentData?.[0]?.size);
      } else if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        message.info({
          content: FIND_NO_DATA,
          style: { marginTop: "40px" },
        });
        setSearchedData([]);
      } else {
        throw new Error(`${getErrorMessage(res, ERROR_MESSAGE)}`);
      }
    } catch (error: any) {
      console.error(ERROR_MESSAGE, error);
      message.error({
        content: error?.message,
        style: { marginTop: "40px" },
      });
      setSearchedData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current && disableFirstLoading) {
      isFirstRender.current = false;
      return;
    }
    // 请求数据
    fetchData();
  }, [api, searchParams, currentPage, pageSize, refreshFlag]);

  useEffect(() => {
    // table 下拉数据
    optionList?.forEach((api: TApi) => {
      if (!api) return;
      const currentApi = getApi(api);
      if (tableOptions[api] && tableOptions[api]?.length !== 0) return;

      currentApi({}).then((res: any) => {
        if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
          const tableOptionsClone = cloneDeep(tableOptions);
          tableOptionsClone[api] = res?.data?.data;
          setTableOptions(tableOptionsClone);
        } else {
          message.error(
            typeof res?.data?.data === "string"
              ? res?.data?.data
              : GET_TABLE_OPTIONS_ERROR
          );
        }
      });
    });
  }, [...(optionList || [])]);

  // // 用来修复antdTable fixed:right出现的对不齐bug
  // const handleWindowResize = () => {
  //   setScreenW(
  //     document.documentElement.clientWidth || document.body.clientWidth
  //   );
  // };

  // const throttleResize = throttle(handleWindowResize, 300);
  // useEffect(() => {
  //   //组件渲染后添加
  //   window.addEventListener("resize", throttleResize);
  //   //组件卸载后移除
  //   return () => {
  //     window.removeEventListener("resize", throttleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   const parentNode = tableRef?.current?.parentNode;
  //   const tableBody = parentNode?.querySelector(".ant-table-body");
  //   const operateCell = parentNode?.querySelector(
  //     ".ant-table-cell-fix-right-first"
  //   );
  //   if (!parentNode || !operateCell || !tableBody) return;
  //   if (tableBody?.scrollHeight === tableBody?.clientHeight) {
  //     operateCell.style.right = 0;
  //   } else {
  //     operateCell.style.right = "6px";
  //   }
  // }, [screenW]);

  useEffect(() => {
    setCurrentPage(1);
    // handleWindowResize();
  }, [searchParams]);

  // 选中时的回调
  const onSelectChange = (...props: any) => {
    const [newSelectedRowKeys] = props;
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 选中配置
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
            showQuickJumper: true,
            showTotal: (total) => `共${total}条数据`,
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

          // components={{
          //   body: {
          //     cell: (props: any) => {
          //       const { children } = props;

          //       return (
          //         <Tooltip
          //           title={Object.entries(searchedData[1] || {}).map(
          //             ([key, value]) => (
          //               <div key={key}>
          //                 <strong>{key}:</strong> {value as any}
          //               </div>
          //             )
          //           )}
          //         >
          //           <td {...props}>{children}</td>
          //         </Tooltip>
          //       );
          //     },
          //   },
          // }}
        />
      </ConfigProvider>
      {needIssueFinished && issueModalOpen && (
        <Modal
          open={issueModalOpen}
          onCancel={() => {
            setIssueModalOpen(false);
            setFinishedData32to31({});
            setConfirmFinished("undo");
            setUnfinishedData32to31({});
            setFinishedData({});
          }}
          footer={null}
          width={1600}
          className={styles.issueModal}
        >
          <Spin spinning={tabLoading === "loading"}>
            <Tabs
              size="large"
              items={[
                {
                  label: "半品下发",
                  key: "1",
                  children: (
                    <ProductionProcessFlowCardAndDispatchList
                      issueID={issueID}
                      queryFlowCardApi={queryFlowCardApi}
                      flowCardType={flowCardType}
                      setRefreshFlag={setRefreshFlag}
                      name={name}
                      setIssueModalOpen={setIssueModalOpen}
                      // 同时下发成品
                      needIssueFinished={true}
                      finishedData32to31={finishedData32to31}
                      setFinishedData32to31={setFinishedData32to31}
                      unfinishedData32to31={unfinishedData32to31}
                      setUnfinishedData32to31={setUnfinishedData32to31}
                      tabChangeFlag={tabChangeFlag}
                      confirmFinished={confirmFinished}
                      tabLoading={tabLoading}
                      setTabLoading={setTabLoading}
                      finishedData={finishedData}
                    />
                  ),
                },
                {
                  label: "成品下发",
                  key: "2",
                  children: finishedParams?.[0]?.barCode ? (
                    <ProductionProcessFlowCardAndDispatchList
                      issueID={{
                        orderid: finishedParams?.[0]?.barCode,
                        itmid: finishedParams?.[0]?.partNumber,
                      }}
                      queryFlowCardApi={"queryfinishedProductsByOI"}
                      flowCardType={"finished"}
                      setRefreshFlag={setRefreshFlag}
                      name={name}
                      setIssueModalOpen={setIssueModalOpen}
                      // 被半品下发
                      notSelfIssue={true}
                      finishedData32to31={finishedData32to31}
                      setFinishedData32to31={setFinishedData32to31}
                      unfinishedData32to31={unfinishedData32to31}
                      setUnfinishedData32to31={setUnfinishedData32to31}
                      tabChangeFlag={tabChangeFlag}
                      confirmFinished={confirmFinished}
                      setConfirmFinished={setConfirmFinished}
                      tabLoading={tabLoading}
                      setTabLoading={setTabLoading}
                      setFinishedData={setFinishedData}
                    />
                  ) : (
                    <Empty children="没有找到对应成品流转卡"></Empty>
                  ),
                },
              ]}
              onChange={(e) => {
                setTabChangeFlag((flag) => !flag);
                if (!confirmFinished) {
                  setConfirmFinished("loading");
                }
              }}
            ></Tabs>
          </Spin>
        </Modal>
      )}
      {!needIssueFinished && issueModalOpen && (
        <Modal
          open={issueModalOpen}
          onCancel={() => setIssueModalOpen(false)}
          footer={null}
          width={1600}
          className={styles.issueModal}
        >
          <ProductionProcessFlowCardAndDispatchList
            issueID={issueID}
            queryFlowCardApi={queryFlowCardApi}
            flowCardType={flowCardType}
            setRefreshFlag={setRefreshFlag}
            name={name}
            setIssueModalOpen={setIssueModalOpen}
          />
        </Modal>
      )}
      {printModalOpen && (
        <Modal
          open={printModalOpen}
          onCancel={() => setPrintModalOpen(false)}
          footer={null}
          width={590}
        >
          <ProductionProcessFlowCardAndDispatchList
            issueID={issueID}
            queryFlowCardApi={queryFlowCardApi}
            flowCardType="print"
            setRefreshFlag={setRefreshFlag}
            name={name}
            setPrintModalOpen={setPrintModalOpen}
            finishedPrintProps={
              needIssueFinished
                ? {
                    issueID: {
                      ...finishedParams,
                    } as any,
                    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
                  }
                : undefined
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default AdvancedSearchTable;
