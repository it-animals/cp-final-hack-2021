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
  }: {
    status?: ProjectStatus | 0;
    type?: ProjectTypesType;
    tags?: string;
  }) {
    console.log(tags);
    console.log(status);
    return axios.get<{ projects: ProjectType[] }>(
      this.path +
        "index" +
        "?expand=tags&sort=id" +
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
