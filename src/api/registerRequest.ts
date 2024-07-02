import { getToken, request } from "../utils";
import { FieldType } from "@/components/RegisterCom/RegisterComType";
export const registerRequest = (RegisterForm: FieldType) => {
  request
    .post("/api/user/insertUser", RegisterForm, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((res) => {
      console.log(res, "注册成功");
    })
    .catch((err) => {
      console.log("注册失败", err);
    });
};
