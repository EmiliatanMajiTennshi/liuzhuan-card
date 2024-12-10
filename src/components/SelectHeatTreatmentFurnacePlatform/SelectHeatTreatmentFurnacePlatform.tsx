import { getHeatTreatmentFurnacePlatformsList } from "@/api";
import { SUCCESS_CODE } from "@/constants";
import { Select } from "antd";
import React, { useEffect } from "react";

const SelectHeatTreatmentFurnacePlatform = (props: any) => {
  const [options, setOptions] = React.useState([]);
  useEffect(() => {
    getHeatTreatmentFurnacePlatformsList().then((res) => {
      // 热处理炉台号
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const platformsOptions = res?.data?.data?.map(
          (item: { id: string; name: string }) => ({
            value: item?.name,
            label: item?.name,
          })
        );
        setOptions(platformsOptions);
      }
    });
  }, []);
  return (
    <Select
      allowClear
      options={options}
      placeholder="请选择炉台"
      {...props}
    ></Select>
  );
};

export default SelectHeatTreatmentFurnacePlatform;
