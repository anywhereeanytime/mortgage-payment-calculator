import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleResult } from "./resultSlice";
import iconCalculator from "./assets/icon-calculator.svg";

const FormContainer = () => {
  const [formData, setFormData] = useState({
    payment: "",
    term: "",
    interestRate: "",
    mortgageType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Предотвращаем перезагрузку страницы после отправки формы и изменяем состояние на true
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleResult());
  };

  const dispatch = useDispatch();

  return (
    <div className="bg-white p-6 text-slate-500 rounded-tl-3xl rounded-bl-3xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-slate-700 text-2xl font-extrabold ">
          Mortgage Calculator
        </h2>
        <button className="text-gray-400 underline text-decoration-skip">
          Clear All
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="amount">Mortgage Amount</label>
          <input
            className="border border-slate-500 rounded-md p-1"
            id="amount"
            type="number"
            name="amount"
            value={formData.payment}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="term">Mortgage Term</label>
            <input
              className="border border-slate-500 rounded-md p-1"
              id="term"
              type="number"
              name="term"
              value={formData.term}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="interestRate">Interest Rate</label>
            <input
              className="border border-slate-500 rounded-md p-1"
              type="number"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="mb-2 block">Mortgage Type</label>
          <div className="border border-slate-500 rounded-md p-2 mb-2">
            <input
              className="p-1"
              type="radio"
              id="repayment"
              name="mortgageType"
              value="repayment"
              checked={formData.mortgageType === "repayment"}
              onChange={handleChange}
            />
            <label htmlFor="repayment" className="font-bold text-slate-700">
              Repayment
            </label>
          </div>
          <div className="border border-slate-500 rounded-md p-2">
            <input
              className="p-1"
              type="radio"
              id="interestOnly"
              name="mortgageType"
              value="interestOnly"
              checked={formData.mortgageType === "interestOnly"}
              onChange={handleChange}
            />
            <label htmlFor="interestOnly" className="font-bold text-slate-700">
              Interest only
            </label>
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleResult())}
          className="bg-primary-lime text-slate-950 font-bold px-4 py-3 flex gap-2 rounded-3xl w-2/3"
          type="submit"
        >
          <img src={iconCalculator} alt="" />
          <p>Calculate Repayments</p>
        </button>
      </form>
    </div>
  );
};
export default FormContainer;
