# react-form-rules

Smart form validation for React using contextual input rules. Show helper messages on input, prevent form submission if invalid, and scroll/select to the first error input.

## Features

- ✅ Input-level validation via `useInputRules`
- ✅ Show dynamic `helperText` while typing
- ✅ Prevent form submission if any rule fails
- ✅ Scroll to and select the first invalid field
- ✅ Minimal setup, fully typed, no external dependencies

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

> ⚠️ `useInputRules` must be used **inside** a `<Form>` component from this package. It depends on context for form integration and won't work outside of it.

## Examples of Rules

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
