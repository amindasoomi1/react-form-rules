# react-form-rules

Smart and flexible form validation for React using contextual input rules.  
Show dynamic helper messages on inputs, prevent form submission if invalid, and automatically scroll/select the first error field.

## Features

- ✅ Input-level validation via `useInputRules` hook
- ✅ Dynamic `helperText` shown while typing
- ✅ Prevent form submission if any rule fails
- ✅ Automatically scroll to and select the first invalid input field
- ✅ Minimal setup, fully typed with TypeScript
- ✅ No external dependencies

## Installation

```bash
npm install react-form-rules
# or
yarn add react-form-rules
```

## Usage

```tsx
import { Form, useInputRules } from "react-form-rules";
import type { Rules } from "react-form-rules";

function FormControl({ label, rules }: { label: string; rules: Rules }) {
  const { ref, error, helperText } = useInputRules({ rules });

  return (
    <div style={{ marginBottom: 12 }}>
      <label>
        {label}
        <input ref={ref} />
      </label>
      {error && <p style={{ color: "red" }}>{helperText}</p>}
    </div>
  );
}

function Login() {
  return (
    <Form onSubmit={() => alert("All valid!")}>
      <FormControl
        label="Email"
        rules={[(value) => value.includes("@") || "Email is not valid"]}
      />
      <FormControl
        label="Password"
        rules={[
          (value) => value.length > 6 || "Password must be longer than 6",
        ]}
      />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

> **Note:** The `<Form>` component **must** wrap all inputs that use `useInputRules` or `WithInputRules` hooks. These hooks depend on React context provided by `<Form>` for validation and error management. Using them outside of `<Form>` will cause errors or unexpected behavior.

---

## `WithInputRules` Component

An alternative render-prop component that provides input validation utilities to its child as a function.

```tsx
<WithInputRules rules={[(val) => val.length > 0 || "This field is required"]}>
  {({ ref, error, helperText }) => (
    <div className={error ? "text-error-700" : undefined}>
      <input ref={ref} />
      <p>{helperText}</p>
    </div>
  )}
</WithInputRules>
```

This component internally uses `useInputRules` and passes the result to its child function, enabling flexible and declarative validation rendering.

---

## Example Of Rules

Rules are simple functions that receive the input value and return either `true` (valid) or a `string` with an error message.

```ts
const required: Rules = [(value) => !!value.trim() || "Field is required"];

const otp: Rules = [
  ...required,
  (value) => value.length === 5 || "OTP must be 5 characters",
];
```

These are only examples. You can define your own rule arrays and pass them to `useInputRules({ rules })`.

## Props

### `<Form />`

| Prop            | Type     | Default | Description                               |
| --------------- | -------- | ------- | ----------------------------------------- |
| `onSubmit`      | Function | -       | Called when all inputs are valid          |
| `onError`       | Function | -       | Called when at least one input is invalid |
| `scrollOnError` | boolean  | `true`  | Scroll to first invalid input             |
| `selectOnError` | boolean  | `true`  | Select input text on first invalid input  |

### `useInputRules()` return

| Field        | Type             | Description                            |
| ------------ | ---------------- | -------------------------------------- |
| `ref`        | `ref` callback   | Pass to `<input />` or `<textarea />`  |
| `helperText` | `string \| null` | Message from first failing rule        |
| `error`      | `boolean`        | Whether the input is currently invalid |

## GitHub

[https://github.com/amindasoomi1/react-form-rules](https://github.com/amindasoomi1/react-form-rules)

---

## License

MIT
