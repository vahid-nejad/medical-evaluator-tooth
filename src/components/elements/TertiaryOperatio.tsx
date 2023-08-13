import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '.';

interface OperationProps {
  onEdit?: () => void;
  onRemove?: () => void;
  onSetDefault?: () => void;
}
export const TertiaryOperation = (props: OperationProps) => (
  <div className="flex h-full items-center justify-center gap-3">
    {!!props.onEdit && (
      <Tooltip text="ویرایش" position="top">
        <PencilIcon
          className="w-5 cursor-pointer text-center text-yellow-400"
          onClick={props.onEdit}
        />
      </Tooltip>
    )}
    {props.onRemove && (
      <Tooltip text="حذف" position="top">
        <TrashIcon
          className="w-5 cursor-pointer text-red-500"
          onClick={props.onRemove}
        />
      </Tooltip>
    )}
    {props.onSetDefault && (
      <Tooltip text="تنظیم به عنوان پیش فرض" position="top">
        <CheckIcon
          className="w-5 cursor-pointer text-emerald-500"
          onClick={props.onSetDefault}
        />
      </Tooltip>
    )}
  </div>
);
