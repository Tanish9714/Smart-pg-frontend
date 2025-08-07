import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

// Custom hook to use toast notifications
export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message, variant = "success") => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 3000,
    });
  };

  return { showToast };
};

export default function ToastProvider({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
