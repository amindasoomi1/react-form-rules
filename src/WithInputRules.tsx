import { ReactNode } from "react";
import { Rules } from "./types";
import useInputRules from "./useInputRules";

type Props = {
  rules?: Rules;
  children?: (inputUtils: ReturnType<typeof useInputRules>) => ReactNode;
};

export default function WithInputRules({ rules = [], children }: Props) {
  const inputUtils = useInputRules({ rules });
  return children?.(inputUtils) ?? null;
}
