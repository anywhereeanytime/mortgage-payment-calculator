const Input = ({ label, id, type, name, value, handleChange, options }) => {
  return (
    <div
      className={`flex ${
        type === "radio"
          ? "flex-row-reverse items-center justify-end border border-slate-500 rounded-md p-2"
          : "col-span-2 flex-col"
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
            className="flex items-center mb-2 cursor-pointer border border-transparent hover:border-yellow-500 p-2 rounded-md w-full"
          >
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              className="accent-primary-lime"
            />
            <span className="ml-2 text-slate-700 font-bold">
              {option.label}
            </span>
          </label>
        ))
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-slate-500 rounded-md p-1"
        />
      )}
    </div>
  );
};

export default Input;
