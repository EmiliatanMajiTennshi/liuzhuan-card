import React, { useState } from "react";
import { AdvancedSearchForm } from "../AdvancedSearchForm";
import { AdvancedSearchTable } from "../AdvancedSearchTable";
import { Collapse, CollapseProps, ConfigProvider, Form, theme } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";
import { IAdvancedSearchCom } from "./AdvancedSearchComType";
import { useNavigate } from "react-router-dom";

const AdvancedSearchCom = (props: IAdvancedSearchCom) => {
  const { formConfig, tableConfig } = props;
  // 查询参数
  const [searchParams, setSearchParams] = useState<object>({});
  // 页面loading
  const [loading, setLoading] = useState(false);
  // 手动刷新列表
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 添加返工流转卡modal
  const [reworkModalOpen, setReworkModalOpen] = useState(false);

  // 添加车间卷装链条
  const [rollChainModalOpen, setRollChainModalOpen] = useState(false);

  const [form] = Form.useForm();

  // 跳转
  const navigate = useNavigate();

  const _formConfig =
    typeof formConfig === "function"
      ? formConfig({ form, navigate, setReworkModalOpen })
      : formConfig;
  const formTitle = _formConfig.formTitle;
  const formExtend = _formConfig.formExtend;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const borderRadiusLG = "8px";

  // 折叠面板的items
  const items: CollapseProps["items"] = [
    {
      key: "search_form",
      label: (
        <h3 style={{ margin: 0, display: "flex" }}>
          {formTitle || "搜索表单"}
        </h3>
      ),
      children: (
        <>
          {formConfig && (
            <div>
              <AdvancedSearchForm
                form={form}
                formConfig={_formConfig}
                loading={loading}
                setSearchParams={setSearchParams}
                selectedRowKeys={selectedRowKeys}
                setRefreshFlag={setRefreshFlag}
                initValues={_formConfig?.initValues}
                reworkModalOpen={reworkModalOpen}
                rollChainModalOpen={rollChainModalOpen}
                setReworkModalOpen={setReworkModalOpen}
                setRollChainModalOpen={setRollChainModalOpen}
              ></AdvancedSearchForm>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <div className={styles["search-com"]}>
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
          defaultActiveKey={formExtend ? ["search_form"] : []}
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
            loading={loading}
            setLoading={setLoading}
            searchParams={searchParams}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            refreshFlag={refreshFlag}
            setRefreshFlag={setRefreshFlag}
          ></AdvancedSearchTable>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchCom;
