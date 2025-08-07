import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TenantsForm from "../TenantsForm";
import { useRef } from "react";
import { useToast } from "./Toast";

export default function FormDialog({ isOpen, onClose, onTenantAdded }) {
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formRef.current) {
      const success = await formRef.current.submitForm();
      if (success) {
        if (onTenantAdded) {
          onTenantAdded();
        } else {
          handleClose();
        }
      }
    }
  };

  const handleClose = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "rounded-lg shadow-xl bg-white animate-fadeIn p-0 sm:p-0",
      }}
    >
      <form onSubmit={handleSubmit} id="subscription-form">
        <DialogTitle className="text-xl font-semibold text-gray-800 border-b px-6 py-4">
          Add New Tenant
        </DialogTitle>

        <DialogContent className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <TenantsForm ref={formRef} />
        </DialogContent>

        <DialogActions className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#5E81F4] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Tenant
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
