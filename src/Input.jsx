const Input = ({ id, name, value, checked, onChange }) => {
  return (
    <div>
      <div className="cursor-pointer border border-slate-500 rounded-md p-2 mb-2 hover:border-primary-lime">
        <label htmlFor="repayment" className="flex items-center cursor-pointer">
          <input
            className="p-1"
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={formData.mortgageType === "repayment"}
            onChange={handleChange}
          />
          <span className="ml-2 font-bold text-slate-700">Repayment</span>
        </label>
      </div>
    </div>
  );
};
export default Input;
