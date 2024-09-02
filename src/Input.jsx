const Input = ({
  label,
  id,
  type,
  name,
  value,
  handleChange,
  options,
  sign,
  register,
  errors,
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex group cursor-pointer ${
        type === "radio"
          ? "flex-row-reverse items-center justify-end border border-slate-400 hover:border-primary-lime rounded-md p-2 mb-3 peer-checked:bg-primary-lime"
          : "flex-col"
      }`}
    >
      {label && (
        <div
          htmlFor={id}
          className={`text-slate-500 cursor-pointer ${
            type === "radio"
              ? "ml-2 text-slate-700 font-bold "
              : "font-semibold mb-1"
          }`}
        >
          {label}
        </div>
      )}

      {type === "radio" && options ? (
        options.map((option) => (
          <div
            key={option.id}
            htmlFor={option.id}
            className="flex items-center mb-2 cursor-pointer border border-slate-500 p-2 rounded-md w-full"
          >
            <input
              {...register(name, { required: true })}
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              onChange={handleChange}
              tabIndex={0}
              className="peer hidden"
            />
            <span className="ml-2 text-slate-700 font-bold">
              {option.label}
            </span>
          </div>
        ))
      ) : (
        <div>
          <div
            className={`flex group ${
              type !== "radio"
                ? `border border-slate-400 ${
                    name === "amount" ? "flex-row-reverse" : "flex-row"
                  } items-start rounded-md 
                  group-hover:border-slate-900 group-focus-within:border-primary-lime 
                  focus-within:border-primary-lime`
                : ""
            }`}
          >
            <input
              {...register(name, {
                required: true,
                ...(name === "amount" && {
                  minLength: {
                    value: 5,
                    message: "Invalid number",
                  },
                }),
              })}
              id={id}
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className="p-1 text-slate-700 font-semibold w-full rounded-md focus:outline-none cursor-pointer"
              tabIndex="0"
            />
            {sign && (
              <span
                className={`w-fit px-3 py-1 font-semibold col-span-1 group-focus-within:bg-primary-lime ${
                  errors?.[name]
                    ? "bg-red-500 text-white"
                    : "text-slate-600 bg-slate-100"
                } ${
                  name === "amount"
                    ? "rounded-tl-md rounded-bl-md"
                    : "rounded-tr-md rounded-br-md "
                }`}
              >
                {sign}
              </span>
            )}
          </div>
        </div>
      )}
    </label>
  );
};

export default Input;
