import React from "react";
import { IContentRender } from "./ContentRenderType";
import classNames from "classnames";
import styles from "./index.module.scss";

const ContentRender = (props: IContentRender) => {
  const { title, children } = props;

  return (
    <div>
      <h3 className={classNames([styles.title, styles.shadow])}>{title}</h3>
      {children}
    </div>
  );
};

export default ContentRender;
