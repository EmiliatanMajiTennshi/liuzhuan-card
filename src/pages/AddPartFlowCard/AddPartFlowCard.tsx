import { useRootStore } from "@/store";
import React, { useEffect } from "react";
const pageTitle = "零件流转卡添加";
const AddPartFlowCard = () => {
  const store = useRootStore();

  const { setPageTitle } = store?.pageTitle;
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(pageTitle);
    }
  }, [setPageTitle]);

  return <div>AddPartFlowCard</div>;
};

export default AddPartFlowCard;
