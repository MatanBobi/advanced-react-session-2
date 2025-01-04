import { use } from "react";
import { ModalContext } from "./Modal";

export function useModal() {
  const context = use(ModalContext);

  if (!context) {
    throw new Error(`useModal must be used in a Modal component`);
  }

  return context;
}
