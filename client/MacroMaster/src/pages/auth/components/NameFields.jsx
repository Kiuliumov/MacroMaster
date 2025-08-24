import FormInput from "./FormInput";
import { commonStyles } from "../commonStyles";

export default function NameFields({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <FormInput
        name="first_name"
        placeholder="First name"
        value={form.first_name}
        onChange={handleChange}
        autoComplete="given-name"
        className={`${commonStyles.input} md:flex-1`}
      />
      <FormInput
        name="last_name"
        placeholder="Last name"
        value={form.last_name}
        onChange={handleChange}
        autoComplete="family-name"
        className={`${commonStyles.input} md:flex-1`}
      />
    </div>
  );
}
