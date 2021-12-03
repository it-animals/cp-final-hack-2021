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
  }: {
    status?: ProjectStatus | 0;
    type?: ProjectTypesType;
  }) {
    console.log(status);
    return axios.get<{ projects: ProjectType[] }>(
      this.path +
        "index" +
        "?expand=tags&sort=id" +
        `${status ? `&ProjectSearch[status]=${status}` : ""}` +
        `${type ? `&ProjectSearch[type]=${type}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      }
    );
  },
};
