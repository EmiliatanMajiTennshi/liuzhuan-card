export interface IAuthRoute {
  children: ReactNode;
}

export interface IUserInfo {
  account: string;
  avatarPath: string;
  id: number | null;
  password: string;
  regTime: string;
  sex: number | null;
  username: string;
}

export interface IRes {
  data: {
    data: IUserInfo;
  };
}
