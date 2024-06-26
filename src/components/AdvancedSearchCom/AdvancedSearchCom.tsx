import React, { useState } from "react";
import { AdvancedSearchForm } from "../AdvancedSearchForm";
import { AdvancedSearchTable } from "../AdvancedSearchTable";
import { Rule } from "antd/es/form";
import { Collapse, CollapseProps, ConfigProvider, theme } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";

export interface IFormItem {
  key: string;
  name: string;
  children: JSX.Element;
  rules?: Rule[];
}
export interface IFormConfig {
  api: string;
  span?: number;
  formItems: IFormItem[];
}

export interface ITableItem {
  title: string;
  dataIndex: string;
}

export interface ITableConfig {
  columns: ITableItem[];
}

interface IAdvancedSearchCom {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  tableConfig: ITableConfig;
  title?: string;
}
const AdvancedSearchCom = (props: IAdvancedSearchCom) => {
  const { formConfig, tableConfig, title } = props;
  const [searchParams, setSearchParams] = useState<object>({});
  const [loading, setLoading] = useState(true);
  const _formConfig =
    typeof formConfig === "function" ? formConfig() : formConfig;
  const api = _formConfig.api;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const borderRadiusLG = "8px";

  const items: CollapseProps["items"] = [
    {
      key: "search_form",
      label: <h3 style={{ margin: 0, display: "flex" }}>搜索表单</h3>,
      children: (
        <>
          {formConfig && (
            <div>
              <AdvancedSearchForm
                formConfig={formConfig}
                loading={loading}
                setSearchParams={setSearchParams}
              ></AdvancedSearchForm>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <div className={styles["search-com"]}>
      <h3
        className={classNames([styles.title, styles.shadow])}
        style={{
          backgroundColor: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {title}
      </h3>
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerBg: colorBgContainer,
              headerPadding: 4,
            },
          },
        }}
      >
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          className={styles.shadow}
          style={{ border: "none", marginBottom: 16 }}
        />
      </ConfigProvider>
      {tableConfig && (
        <div
          style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
            flex: 1,
          }}
          className={classNames([styles.shadow, styles.table])}
        >
          <AdvancedSearchTable
            tableConfig={tableConfig}
            api={api}
            loading={loading}
            setLoading={setLoading}
            searchParams={searchParams}
          ></AdvancedSearchTable>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchCom;
