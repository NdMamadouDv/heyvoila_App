import PropTypes from "prop-types";
import { useField } from "formik";

const Input = ({ type = "", label = "", className = "", ...props }) => {
  const [field, meta] = useField(props);
  const error = meta?.touched && meta?.error;

  return (
    <div className="">
      {label ? <label className="text-gray-600">{label}</label> : null}

      <div className="flex-1">
        {type === "textarea" ? (
          <textarea
            {...field}
            {...props}
            className="textarea textarea-accent textarea-bordered w-full md:max-w-full max-w-xs mt-2 py-6  "
          />
        ) : (
          <div className="">
            <input
              {...field}
              {...props}
              type={type}
              className="input input-accent input-bordered w-full max-w-xs md:max-w-full mt-2 py-6 "
            />
            {error && type !== "number" ? (
              <span className="pr-2 absolute right-0 top-1/2 -translate-y-1/2"></span>
            ) : null}
          </div>
        )}
      </div>

      {error ? (
        <p name="email" className="text-red-600 text-sm first-letter:uppercase">
          {error}
        </p>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
