import axios from "axios";
import { UserDomainType } from "../../domain/user";
import {
  ProjectForTransportType,
  ProjectStatus,
  ProjectType,
  ProjectTypesType,
} from "../../domain/project";

export const projectService = {
  path: "project/",

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
