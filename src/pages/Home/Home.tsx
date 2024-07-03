import React, { Suspense } from "react";
import { Layout, Skeleton } from "antd";
import { Outlet } from "react-router-dom";
import { RenderHeader } from "@/components/RenderHeader";
import { RenderSider } from "@/components/RenderSider";
import { RenderBreadCrumb } from "@/components/RenderBreadCrumb";
import styles from "./index.module.scss";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout className={styles["layout"]}>
      <RenderHeader />
      <Content className={styles["content"]}>
        <RenderBreadCrumb />
        <Layout className={styles["sub-layout"]}>
          <RenderSider />
          <Content className={styles["sub-content"]}>
            <Suspense fallback={<Skeleton active />}>
              <Outlet></Outlet>
            </Suspense>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Home;
