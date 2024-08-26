const Input = ({
  label,
  id,
  type,
  name,
  value,
  handleChange,
  options,
  sign,
}) => {
  return (
    <div
      tabIndex="0"
      className={`flex ${
        id === "term" || id === "interestRate" ? "col-span-1" : "col-span-2"
      } ${
        type === "radio"
          ? "flex-row-reverse items-center justify-end border border-slate-500 hover:border-primary-lime rounded-md p-2 mb-2"
          : "flex-col"
      }`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`text-slate-700 font-bold cursor-pointer ${
            type === "radio" ? "ml-2" : ""
          }`}
        >
          {label}
        </label>
      )}

      {type === "radio" && options ? (
        options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex items-center mb-2 cursor-pointer border border-slate-500 p-2 rounded-md w-full"
          >
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
            />
            <span className="ml-2 text-slate-700 font-bold">
              {option.label}
            </span>
          </label>
        ))
      ) : (
        <div>
          <div
            className={`flex justify-center ${
              type !== "radio"
                ? `border border-slate-500 ${
                    name === "amount" ? "flex-row-reverse" : "flex-row"
                  } items-start rounded-md`
                : ""
            }`}
          >
            <input
              id={id}
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className="p-1 w-full rounded-md"
            />
            {sign && (
              <span
                className={`w-fit px-3 py-1 bg-blue-50 text-slate-600 font-bold col-span-1 ${
                  name === "amount"
                    ? "rounded-tl-md rounded-bl-md"
                    : "rounded-tr-md rounded-br-md"
                }`}
              >
                {sign}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
