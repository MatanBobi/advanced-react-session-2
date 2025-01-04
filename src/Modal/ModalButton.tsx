import React from "react";
import { useModal } from "./useModal";

export function ModalButton({
  children: child,
}: {
  children: React.ReactElement<any>;
}) {
  const [, setIsOpen] = useModal();

  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  });
}
