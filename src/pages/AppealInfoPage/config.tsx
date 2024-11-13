import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Table } from "antd";
import { EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { AppealPage } from "../AppealPage";
import { queryAppealInfoById } from "@/api/queryAppealInfoById";
import { SUCCESS_CODE } from "@/constants";
import { message } from "@/utils";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    buttons: (props: IButtons) => {
      const { loading } = props;

      return [
        <Button
          type="primary"
          htmlType="submit"
          key="search"
          loading={loading}
          style={{ marginRight: 5 }}
        >
          <SearchOutlined />
          查询
        </Button>,

        // <Button
        //   style={{ marginRight: 5 }}
        //   type="dashed"
        //   key="insert"
        //   onClick={() => {
        //     modal.info({
        //       title: "添加申诉单",
        //       content: <AppealPage setRefreshFlag={setRefreshFlag} />,
        //       className: styles.insertModal,
        //       width: 400,
        //       footer: null,
        //     });
        //   }}
        // >
        //   <PlusOutlined />
        //   新增
        // </Button>,
      ];
    },
    formItems: () => {
      return [
        {
          key: "department",
          name: "部门",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "finishTime",
          name: "交期",
          children: <DatePicker style={{ width: "100%" }}></DatePicker>,
          rules: [],
        },

        // {
        //   key: "heatTreatmentFurnacePlatform",
        //   name: "热处理炉台号",
        //   children: (
        //     <Select
        //       allowClear
        //       options={options?.heatTreatmentFurnacePlatforms || []}
        //     ></Select>
        //   ),
        //   rules: [],
        // },

        // {
        //   key: "createTimeStart",
        //   name: "下发时间开始",
        //   children: (
        //     <DatePicker
        //       style={{ width: "100%" }}
        //       onChange={() => {
        //         if (form) {
        //           form.validateFields(["createTimeEnd"]);
        //         }
        //       }}
        //     ></DatePicker>
        //   ),
        //   rules: [
        //     (form: any) => {
        //       const createTimeStart = form.getFieldValue("createTimeStart");
        //       const createTimeEnd = form.getFieldValue("createTimeEnd");

        //       if (
        //         createTimeEnd &&
        //         createTimeStart &&
        //         createTimeEnd < createTimeStart
        //       ) {
        //         return {
        //           validator: true,
        //           message: "开始日期不能晚于结束",
        //         } as unknown as RuleObject;
        //       }
        //       return undefined as unknown as RuleObject;
        //     },
        //   ],
        // },
        // {
        //   key: "createTimeEnd",
        //   name: "下发时间结束",
        //   children: (
        //     <DatePicker
        //       style={{ width: "100%" }}
        //       onChange={() => {
        //         if (form) {
        //           form.validateFields(["createTimeStart"]);
        //         }
        //       }}
        //     ></DatePicker>
        //   ),
        //   rules: [
        //     (form: any) => {
        //       const createTimeStart = form.getFieldValue("createTimeStart");
        //       const createTimeEnd = form.getFieldValue("createTimeEnd");

        //       if (
        //         createTimeEnd &&
        //         createTimeStart &&
        //         createTimeEnd < createTimeStart
        //       ) {
        //         return {
        //           validator: true,
        //           message: "结束日期不能早于开始",
        //         } as unknown as RuleObject;
        //       }

        //       return undefined as unknown as RuleObject;
        //     },
        //   ],
        // },
      ];
    },
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { modal, setRefreshFlag } = props;
  // 获取炉台
  return {
    rowKey: "transferCardCode", // 唯一标识
    api: "queryAppealInfo",
    columns: [
      //   {
      //     title: "流转卡类型",
      //     dataIndex: "transferCardType",
      //     key: "transferCardType",
      //     width: 100,
      //   },
      //   {
      //     title: "零件类型",
      //     dataIndex: "type",
      //     key: "type",
      //     width: 100,
      //   },

      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "部门",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "统计数量",
        dataIndex: "countAllNumber",
        key: "countAllNumber",
      },
      {
        title: "申诉数量",
        dataIndex: "complainNumber",
        key: "complainNumber",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
      },
      {
        title: "交期",
        dataIndex: "finishTime",
        key: "finishTime",
      },
      {
        title: "申诉单",
        dataIndex: "reasonViewList",
        key: "reasonViewList",
        width: 250,
        fixed: "right",
        render: (list?: any[], record?: any) => {
          return (
            <span className={styles.operateButtons}>
              {record?.actualNumber ? (
                <Button
                  onClick={async () => {
                    try {
                      const res = await queryAppealInfoById({
                        id: record.id,
                      });
                      if (SUCCESS_CODE.indexOf(res?.data?.code) === -1) {
                        message.error("获取申诉单失败");
                        return;
                      }
                      const detail = res?.data?.data;
                      modal.info({
                        title: "申诉单",
                        width: 1000,
                        className: styles.appealInfoModal,
                        content: (
                          <Table
                            columns={[
                              {
                                title: "id",
                                dataIndex: "rid",
                                key: "rid",
                                width: "10%",
                              },
                              {
                                title: "申诉原因",
                                dataIndex: "reason",
                                key: "reason",
                                width: "30%",
                              },
                              {
                                title: "数量",
                                dataIndex: "number",
                                key: "number",
                                width: "10%",
                              },
                              {
                                title: "申诉人",
                                dataIndex: "createUser",
                                key: "createUser",
                                width: "10%",
                              },
                              {
                                title: "图片",
                                dataIndex: "imgViews",
                                key: "imgViews",
                                width: "40%",
                                render: (imgArr?: any[]) => {
                                  return (
                                    <div className={styles.imgList}>
                                      {imgArr?.map((item) => (
                                        // <img src={item?.imgPath} alt="" />
                                        <div
                                          style={{
                                            backgroundImage: `url(${item?.imgPath})`,
                                          }}
                                          className={styles.imgItem}
                                        >
                                          <div className={styles.imgButtons}>
                                            <Button
                                              icon={
                                                <EyeOutlined
                                                  style={{ fontSize: 36 }}
                                                />
                                              }
                                              type="link"
                                              onClick={() => {
                                                modal.info({
                                                  title: "预览",
                                                  width: 1200,
                                                  content: (
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                          "center",
                                                        minHeight: 400,
                                                      }}
                                                    >
                                                      <img
                                                        src={item?.imgPath}
                                                        alt=""
                                                        style={{
                                                          maxWidth: "100%",
                                                        }}
                                                      ></img>
                                                    </div>
                                                  ),
                                                });
                                              }}
                                            ></Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                },
                              },
                            ]}
                            dataSource={detail}
                          ></Table>
                        ),
                      });
                    } catch {
                      message.error("获取申诉单失败");
                    }
                  }}
                >
                  查看{record?.actualNumber}个申诉单
                </Button>
              ) : (
                <Button disabled>暂无申诉单</Button>
              )}
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => {
                  modal.info({
                    title: "添加申诉单",
                    closable: true,
                    content: (
                      <AppealPage
                        id={record?.id}
                        finishTime={record?.finishTime}
                        department={record?.department}
                        setRefreshFlag={setRefreshFlag}
                      />
                    ),
                    className: styles.insertModal,
                    width: 400,
                    footer: null,
                  });
                }}
              >
                添加
              </Button>
            </span>
          );
        },
      },

      // {
      //   title: "炉台",
      //   dataIndex: "heatTreatmentFurnacePlatform",
      //   key: "heatTreatmentFurnacePlatform",
      //   fixed: "right",
      //   width: 130,
      // },

      // {
      //   title: "查看工艺",
      //   dataIndex: "processList",
      //   key: "processList",
      //   render: (data: any[]) => {
      //     console.log(data, 1112);

      //     return (

      //     );
      //   },
      //   width: 100,
      //   fixed: "right",
      // },
      //
    ],
  };
};

export { formConfig, tableConfig };
