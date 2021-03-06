import axios from "axios";
import {
  ProjectStatus,
  ProjectType,
  ProjectTypesType,
} from "../../domain/project";

export const projectService = {
  path: "project/",

  getById(id: number) {
    return axios.get<{ projects: ProjectType[] }>(
      this.path +
        `index?expand=tags,teams,projectFiles&ProjectSearch[id]=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      }
    );
  },

  list({
    status,
    type,
    tags,
    search,
    sort,
  }: {
    status?: ProjectStatus | 0;
    type?: ProjectTypesType | 0;
    tags?: string;
    search?: string;
    sort?: string;
  }) {
    return axios.get<{ projects: ProjectType[] }>(
      this.path +
        "index" +
        "?expand=tags,teams" +
        `${sort ? `&sort=${sort}` : "&sort=id"}` +
        `${search ? `&ProjectSearch[search]=${search}` : ""}` +
        `${status ? `&ProjectSearch[status]=${status}` : ""}` +
        `${type ? `&ProjectSearch[type]=${type}` : ""}` +
        `${
          !Boolean(tags?.length)
            ? ""
            : `${tags!
                .split(",")
                .map((item) => `&ProjectSearch[tags][]=${item}`)
                .join("")}`
        }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      }
    );
  },
};
