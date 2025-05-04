import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: any;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

const FormField = ({
  control,
  name,
  placeholder,
  label,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{name}</FormLabel>
        <FormControl>
          <Input className="input" placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
