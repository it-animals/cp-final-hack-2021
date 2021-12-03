import { useEffect } from "react";
import { useAppDispatch } from "../../service/store/store";
import { setUserData } from "../../service/store/userSlice";

export const LogoutPage: CT<unknown> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorage.removeItem("JWT");
    dispatch(setUserData(null));
    window.location.pathname = "/login";
  });
  return <></>;
};
