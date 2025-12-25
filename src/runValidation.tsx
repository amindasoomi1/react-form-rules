import { Rules } from "./types";

export default function runValidation(value: string, rules: Rules) {
  if (!rules.length) return null;
  for (const rule of rules) {
    const result = rule(value);
    const isString = typeof result === "string";
    if (isString) return result;
  }
  return null;
}
