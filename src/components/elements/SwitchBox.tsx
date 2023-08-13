import { Switch } from '@headlessui/react';
import React from 'react';

interface IProps {
  value?: boolean;
  onChange: (value: boolean) => void;
  labelText?: string;
}

export const SwitchBox = (props: IProps) => {
  return (
    <Switch.Group>
      <div className="flex  items-center">
        {props.labelText && (
          <Switch.Label className="ml-4">{props.labelText}</Switch.Label>
        )}
        <Switch
          checked={props.value || false}
          onChange={props.onChange}
          className={`${
            props.value ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              props.value ? '-translate-x-6' : '-translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
