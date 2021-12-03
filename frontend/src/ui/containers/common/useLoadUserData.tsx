import { useEffect } from "react";
import { userService } from "../../../service/user/user";

export const useLoadUserData = () => {
  useEffect(() => {
    async () => {
      if (userService.isAuth()) {
        const data = await userService.info(localStorage!.getItem("JWT")!);
      }
    };
  }, []);
};
