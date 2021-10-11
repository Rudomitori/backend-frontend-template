import { DatePicker, DatePickerProps } from './DatePicker';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import React from 'react';

type HookFormDatePickerProps<TFieldValues extends FieldValues = FieldValues> =
  Omit<DatePickerProps, 'onChange'> & {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    rules?: Exclude<RegisterOptions, 'valueAsDate' | 'setValueAs'>;
    onFocus?: () => void;
    defaultValue?: unknown;
  };

/*
We have to use Controlled components for native html datepickers,
because they require values in a form of 'yyyy-MM-DD', but in uncontrolled form react-hook-form
supply them with Date object.
 */
export function HookFormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
>(props: HookFormDatePickerProps<TFieldValues>) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field }) => (
        <DatePicker
          {...props}
          value={field.value as any}
          onChange={field.onChange}
        />
      )}
    />
  );
}
