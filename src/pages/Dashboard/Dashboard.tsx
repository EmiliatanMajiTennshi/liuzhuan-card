import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { RenderDashboardCard } from "@/components/RenderDashboardCard";
import { countOrderCompletionStatus } from "@/api";
/**首页 */
const Dashboard = () => {
  const fetchData = async () => {
    try {
      const res = countOrderCompletionStatus();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.block1}>
          <RenderDashboardCard>124</RenderDashboardCard>
        </div>
        <div className={styles.block2}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
        <div className={styles.block3}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
        <div className={styles.block4}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
        <div className={styles.block5}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
        <div className={styles.block6}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
        <div className={styles.block7}>
          <RenderDashboardCard></RenderDashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
