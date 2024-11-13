import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { RenderDashboardCard } from "@/components/RenderDashboardCard";
import {
  countProcessUnfinishToStoreMonth,
  countProcessUnfinishToStoreYestereday,
  queryOrderCount,
} from "@/api";
import { CardView } from "@/components/CardView";
import { DEFAULT_ORANGE, ERROR_MESSAGE } from "@/constants";
import classNames from "classnames";
import { RenderChart } from "@/components/RenderChart";
import axios from "axios";
import { AnyObject } from "antd/es/_util/type";
import { App, DatePicker, Skeleton } from "antd";
import { useRafInterval } from "ahooks";
import { formatDate, getTime, message } from "@/utils";

/**首页 */
const Dashboard = () => {
  // const [data, setData] = useState([]);
  const [chartDataMonth, setChartDataMonth] = useState([]);
  const [chartDataYesterday, setChartDataYesterday] = useState([]);
  const [topLoading, setTopLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [monthLoading, setMonthLoading] = useState(true);
  const [orderCount, setOrderCount] = useState([]);
  const [selectedData, setSelectData] = useState(
    formatDate(getTime(), "YYYYMM")
  );
  const fetchData = () => {
    axios
      .all([
        countProcessUnfinishToStoreMonth({ month: selectedData }),
        countProcessUnfinishToStoreYestereday(),
      ])
      .then(
        axios.spread((monthUFChartRes: any, yesterDayUFChartRes: any) => {
          // 请求都成功返回后执行的逻辑

          // 图表数据
          const monthChartData = monthUFChartRes?.data?.data;
          const yesterdayChartData = yesterDayUFChartRes?.data?.data;
          // const result = cloneDeep(monthList);
          // result?.forEach((item: AnyObject) => {
          //   yesterDayList?.forEach((subItem: AnyObject) => {
          //     if (item?.department === subItem?.department) {
          //       item.yesterDayData = subItem;
          //     }
          //   });
          // });
          // setData(result);
          setChartDataMonth(monthChartData);
          setChartDataYesterday(yesterdayChartData);
        })
      )
      .catch((err) => {
        console.log(err);
        message.error(ERROR_MESSAGE);
      })
      .finally(() => {
        setChartLoading(false);
        setMonthLoading(false);
      });

    queryOrderCount().then((res) => {
      const _orderCount = res?.data?.data;
      setOrderCount(_orderCount);
      setTopLoading(false);
    });
  };
  // const fetchData = async () => {
  //   try {
  //     const resMonth = await countOrderCompletionStatus({ sign: "1" });
  //     const resYesterday = await countOrderCompletionStatus({ sign: "2" });
  //     console.log(resMonth, resYesterday);
  //     if (resMonth?.data?.code === SUCCESS_CODE) {
  //       setData(resMonth?.data?.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    // fetchData();
    fetchData();
  }, [selectedData]);
  // 更新数据
  useRafInterval(() => {
    fetchData();
  }, 600000);
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {topLoading && <Skeleton active style={{ height: 150 }} />}
        {!topLoading && (
          <div className={styles.topCards}>
            {orderCount?.map((item: AnyObject, index) => (
              <div className={classNames([styles.block])} key={item.department}>
                <RenderDashboardCard>
                  <div className={classNames([styles.topCard])}>
                    <CardView data={item} />
                  </div>
                </RenderDashboardCard>
              </div>
            ))}

            {/* <div className={classNames([styles.block1, styles.block])}>
            <RenderDashboardCard>
              <CardView data={data?.[0]} />
            </RenderDashboardCard>
          </div>
          <div className={classNames([styles.block, styles.block2])}>
            <RenderDashboardCard>
              <CardView data={data?.[1]} />
            </RenderDashboardCard>
          </div>
          <div className={classNames([styles.block, styles.block3])}>
            <RenderDashboardCard>
              <CardView data={data?.[2]} />
            </RenderDashboardCard>
          </div>
          <div className={classNames([styles.block, styles.block4])}>
            <RenderDashboardCard>
              <CardView data={data?.[3]} />
            </RenderDashboardCard>
          </div>
          <div className={classNames([styles.block, styles.block5])}>
            <RenderDashboardCard>
              <CardView data={data?.[0]} />
            </RenderDashboardCard>
          </div> */}
          </div>
        )}
        <div className={styles.charts}>
          {chartLoading && <Skeleton active style={{ height: 500 }} />}
          {!chartLoading && (
            <>
              <div className={classNames([styles.block, styles.block6])}>
                <RenderDashboardCard>
                  {monthLoading && <Skeleton active style={{ height: 500 }} />}
                  {!monthLoading && (
                    <RenderChart
                      title={
                        <h3
                          style={{
                            margin: "0px 0px 10px",
                            color: DEFAULT_ORANGE,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          已入库流转卡工序未完成情况统计（月）
                          <DatePicker.MonthPicker
                            value={getTime(selectedData)}
                            onChange={(e) => {
                              setMonthLoading(true);
                              setSelectData(formatDate(e, "YYYYMM"));
                            }}
                          ></DatePicker.MonthPicker>
                        </h3>
                      }
                      xAxis={{
                        data: chartDataMonth?.map(
                          (item: any) => item?.department
                        ),
                      }}
                      legend={{
                        data: ["统计张数"],
                      }}
                      series={[
                        {
                          name: "统计张数",
                          type: "bar",
                          emphasis: {
                            focus: "series",
                          },
                          data: chartDataMonth?.map(
                            (item: any) => item?.countAllNumber
                          ),
                          label: {
                            show: true,
                            position: "insideBottom",
                            width: 14,
                            overflow: "break",
                            distance: 5,
                            verticalAlign: "bottom",
                            formatter: "{name|{b} } {value|{c}}",
                            rich: {
                              name: { fontSize: 14 },
                              value: {
                                fontSize: 24,
                                color: DEFAULT_ORANGE,
                              },
                            },
                            // formatter: function (data: any) {
                            //   return data.name;
                            // },
                          },
                        },
                      ]}
                    />
                  )}
                </RenderDashboardCard>
              </div>
              <div className={classNames([styles.block, styles.block7])}>
                <RenderDashboardCard>
                  <RenderChart
                    title={
                      <h3
                        style={{
                          margin: "0px 0px 10px",
                          color: DEFAULT_ORANGE,
                        }}
                      >
                        已入库流转卡工序未完成情况统计（昨日）
                      </h3>
                    }
                    xAxis={{
                      data: chartDataYesterday?.map(
                        (item: any) => item?.department
                      ),
                    }}
                    legend={{
                      data: ["统计张数"],
                    }}
                    series={[
                      {
                        name: "统计张数",
                        type: "bar",
                        emphasis: {
                          focus: "series",
                        },
                        data: chartDataYesterday?.map(
                          (item: any) => item?.countAllNumber
                        ),
                        label: {
                          show: true,
                          position: "insideBottom",
                          width: 14,
                          overflow: "break",
                          distance: 5,
                          verticalAlign: "bottom",
                          formatter: "{name|{b} } {value|{c}}",
                          rich: {
                            name: { fontSize: 14, marginBottom: 16 },
                            value: {
                              paddingTop: 10,
                              fontSize: 24,
                              color: DEFAULT_ORANGE,
                            },
                          },
                          // formatter: function (data: any) {
                          //   return data.name;
                          // },
                        },
                      },
                    ]}
                  />
                </RenderDashboardCard>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
