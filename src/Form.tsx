"use client";

import { ComponentProps, FormEvent, useRef } from "react";
import { FormRulesContext } from "./Context";

type BaseProps = {
  selectOnError?: boolean;
  scrollOnError?: boolean;
};
export default function Form({
  onSubmit,
  onError,
  children,
  selectOnError = true,
  scrollOnError = true,
  ...props
}: BaseProps & Omit<ComponentProps<"form">, keyof BaseProps>) {
  const formControlsRef = useRef<
    Record<string, { value: boolean; callback?: VoidFunction }>
  >({});
  const setFormControl = (
    key: string,
    value: boolean,
    callback?: VoidFunction
  ) => {
    formControlsRef.current[key] = { value, callback };
  };
  const removeFormControl = (key: string) => {
    delete formControlsRef.current[key];
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = [...e.currentTarget.querySelectorAll("[id]")];
    if (!fields.length) return onSubmit?.(e);
    const result = fields.map((e) => {
      const id = e.id || null;
      if (!id) return { element: e, valid: true };
      const formControl = formControlsRef.current[id];
      const valid = formControl?.value ?? true;
      formControl?.callback?.();
      return { element: e, valid };
    });
    const canSubmit = result.every((e) => e.valid);
    if (canSubmit) return onSubmit?.(e);
    const errorElement = result.find((e) => !e.valid)?.element;
    if (selectOnError) {
      // eslint-disable-next-line
      // @ts-expect-error
      errorElement?.select?.();
    }
    if (scrollOnError) {
      errorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
    onError?.(e);
  };
  return (
    <form onSubmit={handleSubmit} {...props}>
      <FormRulesContext.Provider value={{ setFormControl, removeFormControl }}>
        {children}
      </FormRulesContext.Provider>
    </form>
  );
}
