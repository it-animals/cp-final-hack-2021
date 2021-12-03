import axios from "axios";
import { ProjectType } from "../../domain/project";

export const requestService = {
  path: "request/",

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
