import axios from "axios";
import { RequestType } from "../../domain/request";

export const requestService = {
  path: "request/",
  index({ id }: { id: number }) {
    return axios.get<{ requests: RequestType[] }>(
      this.path + `index?RequestSearch[user_id]=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      }
    );
  },
  create({ name, description }: { name: string; description: string }) {
    const data = new FormData();
    data.set("name", name);
    data.set("descr", description);

    return axios.post<unknown>(this.path + "create", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      },
    });
  },
};
