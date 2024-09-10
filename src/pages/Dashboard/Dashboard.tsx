import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { RenderDashboardCard } from "@/components/RenderDashboardCard";
import {
  countOrderCompletionStatus,
  countUnfinishTransferToStore,
} from "@/api";
import { CardView } from "@/components/CardView";
import { DEFAULT_ORANGE, SUCCESS_CODE } from "@/constants";
import classNames from "classnames";
import { RenderChart } from "@/components/RenderChart";
import axios from "axios";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep, set } from "lodash";
import { Skeleton } from "antd";
import { useRafInterval } from "ahooks";

/**首页 */
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [chartDataYear, setChartDataYear] = useState([]);
  const [chartDataYesterday, setChartDataYesterday] = useState([]);
  const [topLoading, setTopLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const fetchData = () =>
    axios
      .all([
        countOrderCompletionStatus({ sign: "1" }),
        countOrderCompletionStatus({ sign: "2" }),
        countUnfinishTransferToStore({ sign: "1" }),
        countUnfinishTransferToStore({ sign: "2" }),
      ])
      .then(
        axios.spread(
          (
            yearRes: any,
            yesterdayRes: any,
            yearUFChartRes: any,
            yesterDayUFChartRes: any
          ) => {
            // 请求都成功返回后执行的逻辑
            const yearList = yearRes?.data?.data;
            const yesterDayList = yesterdayRes?.data?.data;

            // 图表数据
            const yearChartData = yearUFChartRes?.data?.data;
            const yesterdayChartData = yesterDayUFChartRes?.data?.data;
            console.log(yearList, yesterDayList, 123);
            const result = cloneDeep(yearList);
            result?.forEach((item: AnyObject) => {
              yesterDayList?.forEach((subItem: AnyObject) => {
                if (item?.department === subItem?.department) {
                  item.yesterDayData = subItem;
                }
              });
            });
            setData(result);
            setChartDataYear(yearChartData);
            setChartDataYesterday(yesterdayChartData);
            setTopLoading(false);
            setChartLoading(false);
          }
        )
      )
      .catch(() => {});
  // const fetchData = async () => {
  //   try {
  //     const resYear = await countOrderCompletionStatus({ sign: "1" });
  //     const resYesterday = await countOrderCompletionStatus({ sign: "2" });
  //     console.log(resYear, resYesterday);
  //     if (resYear?.data?.code === SUCCESS_CODE) {
  //       setData(resYear?.data?.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    // fetchData();
    fetchData();
  }, []);
  // 更新数据
  useRafInterval(() => {
    fetchData();
  }, 600000);
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {topLoading && <Skeleton active style={{ height: 304 }} />}
        {!topLoading && (
          <div className={styles.topCards}>
            {data?.map((item: AnyObject, index) => (
              <div className={classNames([styles.block])} key={item.department}>
                <RenderDashboardCard>
                  <div className={classNames([styles.topCard])}>
                    <CardView data={data?.[index]} />
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
          {chartLoading && <Skeleton active style={{ height: 304 }} />}
          {!chartLoading && (
            <>
              <div className={classNames([styles.block, styles.block6])}>
                <RenderDashboardCard>
                  <RenderChart
                    title={
                      <h3
                        style={{
                          margin: "0px 0px 10px",
                          color: DEFAULT_ORANGE,
                        }}
                      >
                        已入库流转卡工序未完成情况统计（当年）
                      </h3>
                    }
                    xAxis={{
                      data: chartDataYear?.map((item: any) => item?.department),
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
                        data: chartDataYear?.map(
                          (item: any) => item?.countNumber1
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
                          (item: any) => item?.countNumber1
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
