import { percentage } from "@/utils";
import { Progress, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { CountUp } from "countup.js";
import { DEFAULT_ORANGE } from "@/constants";
import { emptyRender, isEmptyField } from "@/utils/tableRender";

const CardView = (props: { data: AnyObject }) => {
  const { data } = props;
  const [percent, setPercent] = useState<number>(0);
  const countupRef = useRef(null);
  const countupRefYesterDay = useRef(null);
  useEffect(() => {
    const result = percentage(
      data?.orderCompletedQuantity?.orderCompletedQuantity,
      data?.orderQuantity?.orderQuantity
    );
    const timer = setTimeout(() => {
      if (result >= percent + 1) {
        setPercent((percent) => percent + 1);
      } else {
        setPercent(result);
        clearInterval(timer);
      }
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, [percent]);

  const initCountUp = () => {
    const value = data?.orderCompletedQuantity?.orderCompletedQuantity;
    if (!countupRef.current || !value) return;
    const countUpAnim = new CountUp(
      countupRef.current,
      data?.orderCompletedQuantity?.orderCompletedQuantity,
      {
        duration: 1,
      }
    );
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  };
  const initCountUpYesterday = () => {
    const value =
      data?.YesterDayData?.orderCompletedQuantity?.orderCompletedQuantity;
    if (!countupRefYesterDay.current || !value) return;
    const countUpAnim = new CountUp(countupRefYesterDay.current, value, {
      duration: 1,
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  };
  useEffect(() => {
    initCountUp();
    initCountUpYesterday();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        padding: "12px 10px",
      }}
    >
      <Tooltip title={data?.department || "暂无数据"}>
        <h3
          style={{
            margin: 0,
            color: DEFAULT_ORANGE,
          }}
          className={styles.cardTitle}
        >
          {data?.department || "暂无数据"}
        </h3>
      </Tooltip>
      <div>
        <h4 style={{ margin: "8px 0" }}>当年</h4>
        <div
          style={{
            display: "flex",
            color: "rgba(0, 0, 0, .45)",
            alignItems: "center",
            justifyContent: "space-between",
            lineHeight: "30px",
          }}
        >
          完成情况
          <span>
            <span
              ref={countupRef}
              style={{
                color: "#666",
                fontSize: 42,
                marginLeft: 10,
                fontWeight: 700,
              }}
            >
              <>
                {emptyRender(
                  data?.orderCompletedQuantity?.orderCompletedQuantity
                )}
              </>
            </span>
            <span>
              / <>{emptyRender(data?.orderQuantity?.orderQuantity)}</>
            </span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(0, 0, 0, .45)",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: 50 }}>完成率</span>
          <Progress
            className={styles.progress}
            children
            percent={percent}
            size={[300, 20]}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          padding: "16px 30px 0",
        }}
      >
        <div style={{ borderTop: "1px solid #ccc" }}></div>
      </div>
      <div>
        <h4 style={{ margin: "8px 0" }}>昨日</h4>
        <div
          style={{
            display: "flex",
            color: "rgba(0, 0, 0, .45)",
            alignItems: "center",
            justifyContent: "space-between",
            lineHeight: "30px",
          }}
        >
          完成情况
          <span>
            <span
              ref={countupRefYesterDay}
              style={{
                color: "#666",
                fontSize: 42,
                marginLeft: 10,
                fontWeight: 700,
              }}
            >
              <>
                {emptyRender(
                  data?.yesterDayData?.orderCompletedQuantity
                    ?.orderCompletedQuantity
                )}
              </>
            </span>
            <span>
              /
              <>
                {emptyRender(data?.yesterDayData?.orderQuantity?.orderQuantity)}
              </>
            </span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(0, 0, 0, .45)",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: 50 }}>完成率</span>
          <Progress
            className={styles.progress}
            children
            percent={percent}
            size={[300, 20]}
          />
        </div>
      </div>
    </div>
  );
};

export default CardView;
