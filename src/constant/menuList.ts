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
