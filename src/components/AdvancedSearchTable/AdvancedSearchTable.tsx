import { ConfigProvider, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { requestLz } from "@/utils";
import styles from "./index.module.scss";
import { IAdvancedSearchTable } from "./AdvancedSearchTableType";

const AdvancedSearchTable = (props: IAdvancedSearchTable) => {
  const { tableConfig, api, searchParams, loading, setLoading } = props;
  const { columns } = tableConfig;
  const [searchedData, setSearchedData] = useState<any[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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
        setSearchedData([
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },

          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },

          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },

          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasgggggggggggggggggggggggggggggggggdas",
            ljFinDate: "saagassssssssfgsa",
            uomname: "safgsasssssssssgas",
            supcount: "sagafgsssssssssssssssssasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
          {
            type1: "123",
            orderid: "11111111s",
            itmid: "231231",
            goodsname: "1234khsa",
            format: "1241414",
            Pcode: "dghasdas",
            ljFinDate: "saagasfgsa",
            uomname: "safgsagas",
            supcount: "sagafgasga",
            sumcount: "sadad",
            processname1: "wqqqttq",
            processname2: "15151",
            semiFinishedPartFlowCard: "15125154",
          },
        ]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, searchParams, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  return (
    <div style={{ height: "100%" }}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              /* 这里是你的组件 token */
              headerBorderRadius: 0,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={searchedData}
          size="middle"
          className={styles.table}
          scroll={{ y: 240 }} // 240随便打的 用css改了
          pagination={{
            total: totalCount,
            showSizeChanger: true,
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
