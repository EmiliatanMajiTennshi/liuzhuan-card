import React from "react";
import styles from "./index.module.scss";
/**卡片 */
const RenderDashboardCard = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <div className={styles.card}>{children}</div>;
};

export default RenderDashboardCard;