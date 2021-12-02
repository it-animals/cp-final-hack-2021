import { IconButton } from "@mui/material";
import { Close as IconClose } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import * as React from "react";

const SnackbarCloseButton: CT<{
  snackbarKey: any;
}> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose />
    </IconButton>
  );
};

export default SnackbarCloseButton;
