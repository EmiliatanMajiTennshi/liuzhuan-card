import { useSafeState } from "ahooks";
import { Input } from "antd";
import { ValueType } from "rc-input/lib/interface";
import React, { useEffect } from "react";

const OnlyNumberInput = (props: React.ComponentProps<typeof Input>) => {
  const { disabled, placeholder, style, value: _value, onChange } = props;
  const [value, setValue] = useSafeState<ValueType>("");

  useEffect(() => {
    setValue(_value || "");
  }, []);
  const handleChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
      if (onChange) {
        onChange(inputValue);
      }
    }
  };
  return (
    <Input
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={handleChange}
    />
  );
};

export default OnlyNumberInput;