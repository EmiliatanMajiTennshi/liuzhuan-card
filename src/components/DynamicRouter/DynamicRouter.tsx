import React from "react";

const DynamicRouter = () => {
  const menu = JSON.parse(localStorage.getItem("menuList") || "{}");
  if (Object.keys(menu).length !== 0) {
  }
  return <div>DynamicRouter</div>;
};

export default DynamicRouter;
