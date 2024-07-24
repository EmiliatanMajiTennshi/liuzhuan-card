// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { Button, ConfigProvider, Form, Spin, Table, message } from "antd";
import logo from "@/assets/images/logo.png";
import getApi, { TApi } from "@/api";

import { RenderQRCode } from "@/utils";
import { IData } from "@/pages/ProductionProcessFlowCardAndDispatchList/indexType";

import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";

const PartFlowCardPrint = (props: {
  issueID: number;
  queryFlowCardApi?: TApi;
  flowCardType: ITableConfig["flowCardType"];
}) => {
  const { issueID, queryFlowCardApi } = props;
  // 数据
  const [data, setData] = useState<IData>({});
  // loading
  const [loading, setLoading] = useState(false);

  // table选项

  const [form] = Form.useForm();

  /**
   * 获取工序列表
   * @param flowCardType
   * @returns
   */

  // 请求数据
  const fetchData = async () => {
    try {
      setLoading(true);
      if (!queryFlowCardApi) return;
      const currentRequest = getApi(queryFlowCardApi);
      const res: any = await currentRequest({ id: issueID });
      if (res?.status === 200 && res?.data?.data) {
        const formData = res?.data?.data[0];
        form.setFieldsValue(formData);
        setData(formData);
      } else {
        throw new Error("请求数据时发生错误");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("请求数据时发生错误", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    /**加载数据 */

    if (issueID) {
      fetchData();
    }
  }, [issueID]);

  useEffect(() => {}, []);

  // const components = {
  //   body: {
  //     row: EditableRow,
  //     cell: EditableCell,
  //   },
  // };

  // const handleSave = (row: Item) => {
  //   const newData = [...tableData];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   setTableData(newData);
  // };

  // const mergedColumns = columns.map((col: any) => {
  //   if (!col?.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record: Item) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });
  return (
    <div className={styles["flow-card"]}>
      <Spin spinning={loading}>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* 这里是你的组件 token */
                activeShadow: "0 0 0 0px rgba(5, 145, 255, 0.1)",
              },
              Table: {
                headerBorderRadius: 0,
                headerBg: "#accbe9",
                borderColor: "#000",
              },
            },
          }}
        >
          <Form form={form} className={styles["form"]}>
            <div className={styles["form-title"]}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={logo} width={128}></img>
              <h2>生产工序流转卡暨派工单</h2>
              <RenderQRCode
                title="流转卡编号"
                name="transferCardCode"
                value={data?.transferCardCode || data?.transferCard || ""}
                noTd={true}
                size={88}
              />
            </div>
            <table></table>
          </Form>

          <Button type="primary" size="large" onClick={() => form.submit()}>
            保存
          </Button>
        </ConfigProvider>
      </Spin>
    </div>
  );
};

export default PartFlowCardPrint;
