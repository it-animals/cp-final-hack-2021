import axios from "axios";
import { ProjectType } from "../../domain/project";

export const tagsService = {
  path: "tag/",

  index() {
    return axios.get<{ tags: ProjectType["tags"] }>(this.path + "index", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      },
    });
  },
};
