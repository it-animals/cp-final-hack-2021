import { useEffect } from "react";
import { userService } from "../../../service/user/user";
import { useAppDispatch } from "../../../service/store/store";
import { setUserData } from "../../../service/store/userSlice";

export const useLoadUserData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (userService.isAuth()) {
        const data = await userService.info(localStorage!.getItem("JWT")!);
        dispatch(setUserData(data.data.user));
      }
    })();
    //eslint-disable-next-line
  }, []);
};
