import React from "react";
import { Button } from ".";

interface IProps {
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  submit?: boolean;
  className?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmButtons = ({
  onConfirm,
  onCancel,
  submit,
  className,
  confirmText = "تایید",
  cancelText = "انصراف",
}: IProps) => {
  return (
    <div dir="rtl" className={"text-center " + className}>
      <Button
        type={submit ? "submit" : "button"}
        onClick={onConfirm ? onConfirm : () => {}}
        className="inline-block mx-1 w-28"
      >
        {confirmText}
      </Button>
      <Button
        type="button"
        onClick={onCancel ? onCancel : () => {}}
        className="inline-block mx-1 w-28"
        variant="outline-danger"
      >
        {cancelText}
      </Button>
    </div>
  );
};
