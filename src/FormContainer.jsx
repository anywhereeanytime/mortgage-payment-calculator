import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleResult, setMonthlyPayment, clearResult } from "./resultSlice";
import iconCalculator from "./assets/icon-calculator.svg";

const FormContainer = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    interestRate: "",
    mortgageType: "repayment",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      term: "",
      interestRate: "",
      mortgageType: "repayment",
    });
  };

  const calculateMonthlyPayment = () => {
    const { amount, term, interestRate, mortgageType } = formData;
    const principal = parseFloat(amount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(term) * 12;

    if (!principal || !monthlyInterestRate || !numberOfPayments) return null;

    let monthlyPayment;

    // Рассчет для Repayment
    if (mortgageType === "repayment") {
      monthlyPayment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      // Рассчет для Interest Only
    } else if (mortgageType === "interestOnly") {
      monthlyPayment = principal * monthlyInterestRate;
    }

    return monthlyPayment.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthlyPayment = calculateMonthlyPayment();
    if (monthlyPayment) {
      dispatch(setMonthlyPayment(monthlyPayment));
      dispatch(toggleResult());
    } else {
      console.error("Calculation failed, check the input values.");
    }
  };

  return (
    <div className="bg-white p-10 text-slate-500 rounded-tl-3xl rounded-bl-3xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-slate-700 text-2xl font-extrabold">
          Mortgage Calculator
        </h2>
        <button
          type="button"
          className="text-gray-400 underline text-decoration-skip"
          onClick={() => {
            resetForm(); // Сбрасываем форму
            dispatch(clearResult()); // Очищаем результат
          }}
        >
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
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
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
          <div className="cursor-pointer border border-slate-500 rounded-md p-2 mb-2 hover:bg-primary-lime hover:bg-opacity-20">
            <label
              htmlFor="repayment"
              className="flex items-center cursor-pointer"
            >
              <input
                className="p-1"
                type="radio"
                id="repayment"
                name="mortgageType"
                value="repayment"
                checked={formData.mortgageType === "repayment"}
                onChange={handleChange}
              />
              <span className="ml-2 font-bold text-slate-700">Repayment</span>
            </label>
          </div>
          <div className="cursor-pointer border border-slate-500 rounded-md p-2 mb-2 hover:bg-primary-lime hover:bg-opacity-20">
            <label
              htmlFor="interestOnly"
              className="flex items-center cursor-pointer w-full"
            >
              <input
                className="p-1"
                type="radio"
                id="interestOnly"
                name="mortgageType"
                value="interestOnly"
                checked={formData.mortgageType === "interestOnly"}
                onChange={handleChange}
              />
              <span className="ml-2 font-bold text-slate-700">
                Interest only
              </span>
            </label>
          </div>
        </div>
        <button
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
