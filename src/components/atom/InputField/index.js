import { Field } from "react-final-form";

const InputField = ({ name, placeholder, type }) => {
  return (
    <Field {...{ name }}>
      {({ input, meta }) => (
        <div className="inline-block">
          <input
            {...{
              ...input,
              type,
              placeholder,
              error: meta.touched && !!meta.error,
            }}
          />
          <p>{meta.touched && meta.error}</p>
        </div>
      )}
    </Field>
  );
};

export default InputField;
