import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
const RenderChart = (props: any) => {
  const { xAxis, legend, series, title } = props;
  console.log(xAxis, 124);

  const chartRef = useRef(null);
  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    const option = {
      legend,
      xAxis: {
        type: "category",
        data: xAxis?.data || ["1"],
      },
      yAxis: [
        { type: "value" },
        {
          type: "value",
          name: `张`,
          nameTextStyle: {
            color: "#ccc",
            padding: [0, 0, 10, -30],
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              width: 1,
              color: ["#ccc", "#ccc"],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          color: "#fff",
          align: "left",
          fontSize: 14,
        },
        backgroundColor: "rgba(0,0,0,0.8)",
      },
      series,
      grid: {
        left: "50px", // 设置左边距
        right: "40px", // 设置右边距
        top: "60px", // 设置上边距
        bottom: "30px", // 设置下边距
      },
    };
    chartInstance.setOption(option);
  }, []);
  //创建一个resize事件
  const echartsResize = () => {
    echarts.init(chartRef.current).resize();
  };

  //页面卸载，销毁监听
  useEffect(() => {
    //监听echartsResize函数，实现图表自适应
    window.addEventListener("resize", echartsResize);

    return () => {
      window.removeEventListener("resize", echartsResize);
    };
  }, []);

  return (
    <div style={{ height: "100%", padding: "12px 10px" }}>
      {title}
      <div ref={chartRef} style={{ height: "calc(100% - 25px)" }}></div>
    </div>
  );
};

export default RenderChart;
