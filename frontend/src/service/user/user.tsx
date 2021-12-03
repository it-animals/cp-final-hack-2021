import axios from "axios";
import { UserDomainType } from "../../domain/user";

export const userService = {
  path: "user/",
  login({ email, password }: { email: string; password: string }) {
    const data = new FormData();
    data.set("email", email.toLowerCase());
    data.set("password", password);
    return axios.post<{ jwt: string }>(this.path + "login", data);
  },
  info(jwt: string) {
    return axios.get<{ user: UserDomainType }>(this.path + "info", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  register({
    email,
    password,
    fio,
    role,
  }: {
    email: string;
    password: string;
    fio: string;
    role: number;
  }) {
    const data = new FormData();
    data.set("email", email.toLowerCase());
    data.set("password", password);
    data.set("role", role.toString());
    data.set("fio", fio);
    return axios.post<{ user: { email: string } }>(
      this.path + "register",
      data
    );
  },
  saveToken(token: string) {
    localStorage.setItem("JWT", token);
  },
  isAuth() {
    return !!localStorage.getItem("JWT");
  },
};
