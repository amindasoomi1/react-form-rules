import { Rules } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { useFormRulesContext } from "./Context";
import randomID from "./randomID";

// Task #1: Validate on submit or change or blur
// Task #2: Async rules

type Config = {
  rules: Rules;
  // validateOn?: ("blur" | "change" | "submit")[];
};

export default function useInputRules({
  rules,
}: // validateOn = ["submit"],
Config) {
  const { setFormControl, removeFormControl } = useFormRulesContext();
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasError = useMemo(() => {
    return !!rules.length && error && !!errorMessage;
  }, [rules, error, errorMessage]);

  // const isBlur = useMemo(() => {
  //   return validateOn.includes("blur");
  // }, [validateOn]);
  // const isChange = useMemo(() => {
  //   return validateOn.includes("change");
  // }, [validateOn]);
  // const isSubmit = useMemo(() => {
  //   return validateOn.includes("submit");
  // }, [validateOn]);
  //   const isAsync = useCallback((fn: Function) => {
  //     const AsyncFunction = async function () {}.constructor;
  //     return fn instanceof AsyncFunction;
  //   }, []);

  const validate = useCallback(
    (value: string) => {
      if (!rules.length) return null;
      for (const rule of rules) {
        const result = rule(value);
        const isString = typeof result === "string";
        if (isString) return result;
      }
      return null;
    },
    [rules]
  );
  const handleValidate = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement) => {
      const id = node.id;
      const value = node.value;
      const errorMessage = validate(value);
      const valid = !errorMessage;
      setErrorMessage(errorMessage);
      setFormControl?.(id, valid, () => setError(!valid));
    },
    [validate, setFormControl]
  );

  const inputRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (!node) return;
      node.id ||= randomID();
      const id = node.id;
      handleValidate(node);
      const ob = new MutationObserver(() => handleValidate(node));
      ob.observe(node, { attributes: true, childList: true, subtree: true });
      return () => {
        ob.disconnect();
        removeFormControl?.(id);
      };
    },
    [handleValidate, removeFormControl]
  );

  return {
    ref: inputRef,
    error: hasError,
    errorMessage,
  };
}
