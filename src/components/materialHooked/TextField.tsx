import React from 'react';
import { TextField } from '@material-ui/core';
import { Control, useController } from 'react-hook-form';

type Props = {
  control: any;
  name: any;
  defaultValue?: string;
  required?: boolean;
  label?: string;
  fullWidth?: boolean;
};

function TextInput({
  control,
  name,
  defaultValue = '',
  required = false,
  label = '',
  fullWidth = false,
}: Props) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: required },
    defaultValue: defaultValue,
  });

  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      label={label}
      fullWidth={fullWidth}
    />
  );
}

export { TextInput };
