import React from "react";
import { IContentRender } from "./ContentRenderType";
// import classNames from "classnames";
// import styles from "./index.module.scss";

const ContentRender = (props: IContentRender) => {
  const { children } = props;

  return (
    <>
      {/* <h3 className={classNames([styles.title, styles.shadow])}>{title}</h3> */}
      {children}
    </>
  );
};

export default ContentRender;
