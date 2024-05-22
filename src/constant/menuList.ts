const menuList = [
  {
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
    label: "链条流转卡",
    children: [
      {
        key: "/issue_chainboards_semi_finished_part_flow_card",
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
      { key: "8", label: "零件流转卡打印" },
      { key: "9", label: "订单完成情况统计" },
      { key: "q", label: "流转卡入库信息查询" },
      { key: "w", label: "物料重工流程卡添加" },
      { key: "e", label: "重工流程卡查询" },
      { key: "r", label: "物流-热处理配料查询" },
      { key: "a", label: "品检-外购外协报检查询" },
      { key: "s", label: "热处理炉台作业" },
      { key: "d", label: "甩毛刺-甩圆角-炉台变更" },
      { key: "f", label: "生料库存查询" },
      { key: "t", label: "工艺未完成查询" },
      { key: "y", label: "员工信息添加" },
    ],
  },
];
interface IMenuItem {
  key: string;
  label: string;
}
const flatMenuList: IMenuItem[] = [];
menuList.forEach((item) => {
  if (item?.children) {
    item?.children.forEach((subItem) => {
      flatMenuList.push(subItem);
    });
  } else {
    flatMenuList.push(item);
  }
});

export { menuList, flatMenuList };
