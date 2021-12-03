import { Typography } from "@mui/material";

export const NotFound: CT<unknown> = ({ className }) => {
  return (
    <Typography className={className} variant={"h6"}>
      Ничего не найдено
    </Typography>
  );
};
