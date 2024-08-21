import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleResult, setMonthlyPayment, clearResult } from "./resultSlice";
import iconCalculator from "./assets/icon-calculator.svg";
import { inputsData } from "./data.js";

const FormContainer = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    interestRate: "",
    mortgageType: "",
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
      mortgageType: "",
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
    <div className="bg-white px-5 py-8 md:p-10 text-slate-500 rounded-tl-3xl rounded-bl-3xl">
      <div className="md:flex md:justify-between md:items-center mb-5">
        <h2 className="text-slate-700 text-2xl font-extrabold mb-2 sm:mb-0">
          Mortgage Calculator
        </h2>
        <button
          type="button"
          className="text-gray-400 font-medium hover:text-slate-600 underline text-decoration-skip"
          onClick={() => {
            resetForm();
            dispatch(clearResult());
          }}
        >
          Clear All
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 font-medium">
        {/* Mortgage Amount, которая занимает 2 колонки */}
        <div className="grid grid-cols-2 gap-3">
          {inputsData
            .filter((input) => input.id === "amount")
            .map((input, index) => (
              <div className="flex flex-col col-span-2" key={input.id || index}>
                <label htmlFor={input.id}>{input.label}</label>
                <input
                  className="border border-slate-500 rounded-md p-1"
                  id={input.id}
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]} // Используйте значение из formData
                  onChange={handleChange}
                  required={input.validation && input.validation.required}
                />
              </div>
            ))}
        </div>

        {/* Mortgage Term и Interest Rate */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          {inputsData
            .filter(
              (input) => input.id === "term" || input.id === "interestRate"
            )
            .map((input, index) => (
              <div className="flex flex-col" key={input.id || index}>
                <label htmlFor={input.id}>{input.label}</label>
                <input
                  className="border border-slate-500 rounded-md p-1"
                  id={input.id}
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required={input.validation && input.validation.required}
                />
              </div>
            ))}
        </div>

        {/* Mortgage Type (Repayment и Interest Only) */}
        <div className="mb-3">
          <label className="mb-2 block">Mortgage Type</label>
          <div className="grid grid-cols-1">
            {inputsData
              .filter((input) => input.id === "mortgageType")
              .map((input) =>
                input.options.map((option) => (
                  <div
                    key={option.id}
                    className="cursor-pointer border border-slate-500 rounded-md p-2 mb-2 hover:border-primary-lime"
                  >
                    <label
                      htmlFor={option.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        className="p-1"
                        type="radio"
                        id={option.id}
                        name={input.name}
                        value={option.value}
                        checked={formData[input.name] === option.value}
                        onChange={handleChange}
                      />
                      <span className="ml-2 font-bold text-slate-700">
                        {option.label}
                      </span>
                    </label>
                  </div>
                ))
              )}
          </div>
        </div>

        <button
          className="bg-primary-lime text-slate-950 font-bold px-4 py-3 flex justify-center gap-2 rounded-3xl w-full md:w-2/3 hover:bg-primary-lime hover:bg-opacity-70"
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
