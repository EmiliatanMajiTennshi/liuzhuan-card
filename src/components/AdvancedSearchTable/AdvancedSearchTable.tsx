import { Button, ConfigProvider, Modal, Table } from "antd";
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
import { getErrorMessage, message } from "@/utils";
import { MultiDetail } from "@/pages/MultiDetail";
import { UnfinishedIssueFinishedModal } from "@/pages/UnfinishedIssueFinishedModal";
import { OutsourcingIssueTogetherModal } from "@/pages/OutsourcingIssueTogetherModal";
import { SplitCardModal } from "@/pages/SplitCardModal";

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
  // 多工序模态框
  const [multiDetailModalOpen, setMultiDetailModalOpen] = useState(false);
  // 下发id
  const [issueID, setIssueID] = useState<IIssueID>({ orderid: "", itmid: "" });
  // 窗口大小 用来监听窗口变化
  // const [screenW, setScreenW] = useState(0);
  // table里的各种下拉选项
  const [tableOptions, setTableOptions] = useState<AnyObject>({});
  // 如果需要半品下发成品的搜索成品的参数
  const [finishedParams, setFinishedParams] = useState<AnyObject>({});
  // 数量信息
  const [weightViews, setWeightViews] = useState<AnyObject>([]);
  // // 鼠标所在行
  // const [hoveredRow, setHoveredRow] = useState(null);
  // 分卡modal
  const [splitCardModalOpen, setSplitCardModalOpen] = useState(false);
  const tableRef = useRef<any>(null);
  // 首次是否加载
  const isFirstRender = useRef(true);
  const [modal, contextHolder] = Modal.useModal();

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
    setMultiDetailModalOpen,
    modal,
    setSplitCardModalOpen,
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
    noPaging,
    readonly,
    issuedFlowCardApi,
    defaultPageSize,
    hideCountView,
    RefreshNoData,
  } = _tableConfig;

  // 获取当前页面table数据的请求
  const currentRequest = getApi(api);
  const params = {
    // 默认参数
    ...defaultParam,
    // 搜索参数
    ...searchParams,
    pageSize,
    pageNum: currentPage,
  };
  const fetchData = async () => {
    if (RefreshNoData) {
      setSearchedData([]);
    }

    try {
      setLoading(true);
      setSelectedRowKeys([]);
      const res: any = await currentRequest(params);
      const currentData = res?.data?.data;

      if (res?.data && currentData) {
        setSearchedData(currentData);
        setTotalCount(
          res?.data?.page?.total || res?.data?.total || currentData?.[0]?.size
        );
        setWeightViews(res?.data?.weightViews);
      } else if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        message.info(FIND_NO_DATA, { style: { marginTop: "40px" } });
        setSearchedData([]);
      } else {
        throw new Error(`${getErrorMessage(res, ERROR_MESSAGE)}`);
      }
    } catch (error: any) {
      console.error(ERROR_MESSAGE, error);
      message.error(error?.message, { style: { marginTop: "40px" } });
      setSearchedData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 防止初次加载
    if (
      isFirstRender.current &&
      (noPaging || disableFirstLoading || defaultPageSize)
    ) {
      isFirstRender.current = false;
      return;
    }
    // 请求数据
    fetchData();
  }, [api, searchParams, currentPage, pageSize, refreshFlag]);

  useEffect(() => {
    if (noPaging) {
      setPageSize(99999);
      isFirstRender.current = true;
    }
  }, [noPaging]);
  useEffect(() => {
    if (defaultPageSize) {
      setPageSize(defaultPageSize);
      // isFirstRender.current = true;
    }
  }, [defaultPageSize]);

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
  console.log(_tableConfig, 11232);

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
            pageSizeOptions: [5, 10, 20, 50, 99999],
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
        {!hideCountView && weightViews && weightViews?.length !== 0 && (
          <span
            style={{
              position: "absolute",
              top: 118,
              fontSize: 24,
              marginLeft: 20,
              right: 40,
            }}
          >
            总流转数量
            {weightViews?.map((item: any) => (
              <span style={{ marginLeft: 20 }}>
                {(item?.kg || item?.pcs) + item?.unit}
              </span>
            ))}
          </span>
        )}
      </ConfigProvider>
      {needIssueFinished && issueModalOpen && (
        <Modal
          open={issueModalOpen}
          onCancel={() => {
            setIssueModalOpen(false);
            setFinishedParams([{ partNumber: "", barCode: "" }]);
          }}
          footer={null}
          width={1600}
          className={styles.issueModal}
        >
          {flowCardType === "unfinished" && (
            <UnfinishedIssueFinishedModal
              issueID={issueID}
              queryFlowCardApi={queryFlowCardApi}
              flowCardType={flowCardType}
              setRefreshFlag={setRefreshFlag}
              issuedFlowCardApi={issuedFlowCardApi}
              beIssuedID={{
                orderid: finishedParams?.[0]?.barCode,
                itmid: finishedParams?.[0]?.partNumber,
              }}
            />
          )}
          {flowCardType === "outsourcing" && (
            <OutsourcingIssueTogetherModal
              issueID={issueID}
              queryFlowCardApi={queryFlowCardApi}
              flowCardType={flowCardType}
              setRefreshFlag={setRefreshFlag}
              issuedFlowCardApi={issuedFlowCardApi}
              beIssuedID={{
                orderid: finishedParams?.[0]?.barCode,
                itmid: finishedParams?.[0]?.partNumber,
              }}
            />
          )}
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
      {multiDetailModalOpen && (
        <Modal
          open={multiDetailModalOpen}
          onCancel={() => setMultiDetailModalOpen(false)}
          footer={null}
          width={1600}
        >
          <MultiDetail requestParams={issueID} readOnly={readonly} />
        </Modal>
      )}
      {splitCardModalOpen && (
        <Modal
          open={splitCardModalOpen}
          onCancel={() => setSplitCardModalOpen(false)}
          footer={null}
          width={800}
        >
          <SplitCardModal
            issueID={issueID}
            queryFlowCardApi={queryFlowCardApi}
            flowCardType={flowCardType}
            setRefreshFlag={setRefreshFlag}
            issuedFlowCardApi={issuedFlowCardApi}
          />
        </Modal>
      )}
      <div className={styles.modalContent}> {contextHolder}</div>
    </div>
  );
};

export default AdvancedSearchTable;
