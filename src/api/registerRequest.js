import { getToken, request } from "../utils";

export const registerRequest = (RegisterForm) => {
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
