import React from "react";
import { Controller, FieldValues, Control, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

// Optional select option support
interface SelectOption {
    label: string;
    value: string;
}

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "file" | "select";
    errorMessage?: string;
    options?: SelectOption[];
}


const baseFieldClass = `
  w-full h-10 rounded-lg px-4 text-sm transition shadow-sm
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  text-gray-900 dark:text-gray-100
  placeholder:text-gray-400 dark:placeholder:text-gray-500
  focus:outline-none focus:ring-2 focus:ring-app-purple-500 focus:border-app-purple-500
  hover:bg-gray-100 dark:hover:bg-gray-700
`;

const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    errorMessage = "",
    options,
}: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem className="space-y-1.5">
                {/* Label */}
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </FormLabel>

                {/* Field */}
                <FormControl>
                    {type === "select" ? (
                        <select {...field} className={baseFieldClass}>
                            <option value="" disabled hidden>
                                {placeholder || "Select an option"}
                            </option>

                            {options?.map((opt) => (
                                <option
                                    key={opt.value}
                                    value={opt.value}
                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={baseFieldClass}
                        />
                    )}
                </FormControl>

                {/* Error */}
                {errorMessage && (
                    <FormMessage className="text-xs text-red-500">
                        {errorMessage}
                    </FormMessage>
                )}
            </FormItem>
        )}
    />
);

export default FormField;
