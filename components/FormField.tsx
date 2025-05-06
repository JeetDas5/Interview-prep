import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: any;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  type?: string;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            className={`input ${
              fieldState.error ? "border-red-500 ring-red-500" : ""
            }`}
          />
        </FormControl>
        <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
);

export default FormField;
