import { ReadOnlyInput } from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";
import styles from "./index.module.scss";
import { fontSize28, normalStyle, redLabel } from "./styles";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
  reworkUnit?: string;
}

const PrintFlowCardFormRollChain = (props: IProps) => {
  return (
    <tbody className={styles.printForm}>
      <tr>
        <ReadOnlyInput
          title="追溯号"
          name="rollChainTraceabilityNumber"
          titleStyle={{ ...redLabel }}
          style={fontSize28}
          labelColSpan={2}
          colSpan={8}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="品名"
          name="name"
          titleStyle={normalStyle}
          style={fontSize28}
          labelColSpan={2}
          colSpan={8}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="规格"
          name="spec"
          labelColSpan={2}
          colSpan={8}
          titleStyle={{ ...normalStyle }}
          style={fontSize28}
        />
      </tr>
    </tbody>
  );
};
export default PrintFlowCardFormRollChain;
