import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";

const DebouncedTextArea = (props: any) => {
  const { className } = props;
  const [inputFinished, setInputFinished] = useState(true);
  const [value, setValue] = useState("123");
  const textAreaRef = useRef<any>(null);
  useEffect(() => {
    if (textAreaRef?.current) {
      const textAreaElement = textAreaRef?.current?.resizableTextArea?.textArea;
      textAreaElement.value = value;
    }
  });

  return (
    <>
      {inputFinished ? (
        <Input.TextArea
          className={className}
          value={value}
          onFocus={() => {
            setInputFinished(false);
          }}
        ></Input.TextArea>
      ) : (
        <Input.TextArea
          ref={textAreaRef}
          className={className}
          onBlur={() => {
            setInputFinished(true);
          }}
          // className={styles.footerTextArea}
        ></Input.TextArea>
      )}
    </>
  );
};

export default DebouncedTextArea;
