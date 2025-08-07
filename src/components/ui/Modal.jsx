import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog
      className="fixed top-[10vh] left-1/2 transform -translate-x-1/2 w-[30rem] max-h-[80vh] bg-[#e2e5eb] p-8 rounded-md z-[100] shadow-[0_2px_8px_rgba(0,0,0,0.26)] flex flex-col justify-between animate-slideDownFadeIn"
      ref={dialog}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
