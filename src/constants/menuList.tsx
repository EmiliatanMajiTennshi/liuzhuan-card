import { SettingOutlined, ProfileOutlined } from "@ant-design/icons";
import { IMenuItem } from "./constantsType";
const menuList = [
  {
    icon: <SettingOutlined />,
    key: "1",
    label: "新豪轴承",
    children: [
      { key: "/add_part_flow_card", label: "零件流转卡添加" },
      { key: "/add_assembly_flow_card", label: "装配流转卡添加" },
      { key: "/flow_card_query", label: "流转卡查询" },
      { key: "/operator_simple_task", label: "操作工简易作业" },
      { key: "/flow_card_cancel", label: "流转卡作废" },
      { key: "/add_employee_info", label: "员工信息添加" },
      { key: "/full_inspection_defect_rate", label: "全检不良率" },
    ],
  },
  {
    key: "2",
    icon: <ProfileOutlined />,
    label: "链条流转卡",
    children: [
      {
        key: "/issue_chain_board_semi_finished_part_flow_card",
        label: "下发链板半品零件流转卡",
      },
      {
        key: "/issue_rollernest_semi_finished_part_flow_card",
        label: "下发套滚销半品零件流转卡",
      },
      { key: "/issue_finished_part_flow_card", label: "下发成品零件流转卡" },
      {
        key: "/issue_outsourcing_flow_card",
        label: "下发外协外购流转卡",
      },
      { key: "/issue_replenishment_order_flow_card", label: "下发补单流转卡" },
      { key: "/part_flow_card_query", label: "零件流转卡查询" },
      { key: "/part_flow_card_print", label: "零件流转卡打印" },
      { key: "/order_completion_status", label: "订单完成情况统计" },
      { key: "/flow_card_storage_info", label: "流转卡入库信息查询" },
      { key: "/material_rework_process_card", label: "物料重工流程卡添加" },
      { key: "/heavy_industry_process_card", label: "重工流程卡查询" },
      {
        key: "/logistics_heat_treatment_ingredients",
        label: "物流-热处理配料查询",
      },
      {
        key: "/quality_inspection_outsourcing_inspection",
        label: "品检-外购外协报检查询",
      },
      {
        key: "/heat_treatment_furnace_operation",
        label: "热处理炉台作业",
      },
      {
        key: "/update_deburring_rounding_furnace",
        label: "甩毛刺-甩圆角-炉台变更",
      },
      { key: "/query_raw_material_inventory_inquiry", label: "生料库存查询" },
      { key: "/query_process_incomplete", label: "工艺未完成查询" },
      {
        key: "/add_employee_info_chain",
        label: "员工信息添加",
      },
    ],
  },
];

const nonMenuItems = [
  {
    key: "/production_process_flow_card_and_dispatch_list",
    label: "生产工序流转卡暨派工单",
  },
  {
    key: "/404",
    label: "404",
  },
  {
    key: "/",
    label: "首页",
  },
];

/**获取扁平菜单 */
const getFlatMenuList = (menu: IMenuItem[]) => {
  const flatMenuList: IMenuItem[] = [];

  menu.forEach((item) => {
    if (item?.children) {
      item?.children.forEach((subItem: IMenuItem) => {
        subItem.parent = item.label;
        flatMenuList.push(subItem);
      });
    } else {
      flatMenuList.push(item);
    }
  });

  nonMenuItems.forEach((item) => {
    flatMenuList.push(item);
  });
  return flatMenuList;
};

export { menuList, getFlatMenuList };
