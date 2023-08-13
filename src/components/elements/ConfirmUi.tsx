import React from 'react';
import { Button, ButtonVariantType } from './Button';
import { FormHeader } from './FormHeader';
import { Modal } from './Modal';

interface Props {
  header?: string;
  message?: string;
  confirmText?: any;
  cancelText?: any;
  confirmClassName?: string;
  cancelClassName?: string;
  confirmButtonVariant?: ButtonVariantType;
  cancelButtonVariant?: ButtonVariantType;
  onConfirm?: () => void;
  onCancel?: () => void;
}
const ConfirmUi = (props: Props) => {
  return (
    <Modal size="sm" className="overflow-hidden" show={true} onClose={() => ''}>
      <FormHeader>{props.header ?? '...'}</FormHeader>

      <p className="p-2 text-center">{props.message}</p>
      <div className="mt-2 flex justify-center gap-8 p-3">
        <Button
          onClick={props.onConfirm}
          className={props.confirmClassName + ' w-28'}
          variant={props.confirmButtonVariant}
        >
          {props.confirmText ?? 'تایید'}
        </Button>
        <Button
          onClick={props.onCancel}
          className={props.cancelClassName + ' w-28'}
          variant={props.cancelButtonVariant ?? 'outline-danger'}
        >
          {props.cancelText ?? 'انصراف'}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmUi;
