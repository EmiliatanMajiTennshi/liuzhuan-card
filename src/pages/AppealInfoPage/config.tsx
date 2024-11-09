import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, Input, Table } from "antd";
import { EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { AppealPage } from "../AppealPage";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    buttons: (props: IButtons) => {
      const { loading, modal, setRefreshFlag } = props;

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
    formItems: ({ options, setOptions }) => {
      // if (!options.heatTreatmentFurnacePlatforms) {
      //   setOptions({
      //     ...options,
      //     heatTreatmentFurnacePlatforms: [{}],
      //   });
      //   getHeatTreatmentFurnacePlatformsList().then((res) => {
      //     // 热处理炉台号
      //     if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
      //       const platformsOptions = res?.data?.data?.map(
      //         (item: { id: string; name: string }) => ({
      //           value: item?.name,
      //           label: item?.name,
      //         })
      //       );
      //       setOptions({
      //         ...options,
      //         heatTreatmentFurnacePlatforms: platformsOptions,
      //       });
      //     }
      //   });
      // }
      return [
        {
          key: "department",
          name: "部门",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "id",
          name: "id",
          children: <Input></Input>,
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
    // handleDate: true,
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
        title: "数量",
        dataIndex: "countAllNumber",
        key: "countAllNumber",
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
        render: (list?: any[], record?: any) => {
          return (
            <span className={styles.operateButtons}>
              {list ? (
                <Button
                  onClick={() => {
                    modal.info({
                      title: "申诉单",
                      width: 1000,
                      className: styles.appealInfoModal,
                      content: (
                        <Table
                          columns={[
                            {
                              title: "id",
                              dataIndex: "parentId",
                              key: "parentId",
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
                              title: "图片",
                              dataIndex: "imgViews",
                              key: "imgViews",
                              width: "50%",
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
                                                      justifyContent: "center",
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
                          dataSource={list}
                        ></Table>
                      ),
                    });
                  }}
                >
                  查看{list?.length}个申诉单
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
