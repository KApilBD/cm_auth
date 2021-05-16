import { Field } from "react-final-form";

const CheckboxField = ({ name, label }) => {
  return (
    <Field {...{ name }} type="checkbox">
      {({ input, meta }) => (
        <div className="inline-block">
          <input
            type="checkbox"
            {...{
              ...input,
              label,
              error: meta.touched && !!meta.error,
            }}
          />
          <p>{meta.touched && meta.error}</p>
        </div>
      )}
    </Field>
  );
};

export default CheckboxField;
