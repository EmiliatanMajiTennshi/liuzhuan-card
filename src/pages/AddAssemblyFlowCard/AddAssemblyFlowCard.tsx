import { useRootStore } from "@/store";
import React, { useEffect } from "react";
const pageTitle = "装配流转卡添加";
const AddAssemblyFlowCard = () => {
  const store = useRootStore();
  const { setPageTitle } = store?.pageTitle;
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(pageTitle);
    }
  }, [setPageTitle]);
  return <div>AddAssemblyFlowCard</div>;
};

export default AddAssemblyFlowCard;
