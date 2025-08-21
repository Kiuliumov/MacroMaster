import PasswordField from "./PasswordField";

export default function PasswordFields({ form, handleChange }) {
  return (
    <>
      <PasswordField
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <PasswordField
        name="password2"
        placeholder="Confirm Password"
        value={form.password2}
        onChange={handleChange}
        compareValue={form.password}
      />
    </>
  );
}
