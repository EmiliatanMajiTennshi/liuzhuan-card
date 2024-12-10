import { useRootStore } from "@/store";
import { Button } from "antd";

const departmentArr = [
  "热处理",
  "零件",
  "冲压",
  "扶梯冲压",
  "精密",
  "磨床",
  "机模",
  "标品余量",
];
const GoToDepartmentDashboard = () => {
  const store = useRootStore();

  const currentDepartment =
    departmentArr.find(
      (item) => store.user.userInfo?.roleName?.indexOf(item) !== -1
    ) || "";
  console.log(currentDepartment, 1212);

  return (
    <a
      href={`http://192.168.20.222:8074#${currentDepartment}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button type="primary" style={{ width: 200 }}>
        点击跳转到事业部看板
      </Button>
    </a>
  );
};

export default GoToDepartmentDashboard;
