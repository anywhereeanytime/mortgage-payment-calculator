import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleResult, setMonthlyPayment, clearResult } from "./resultSlice";
import iconCalculator from "./assets/icon-calculator.svg";
import { inputsData } from "./data.js";
import Input from "./Input.jsx";

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
        {inputsData.map((input) => {
          if (input.type === "radio") {
            return input.options.map((option) => (
              <Input
                key={option.id}
                label={option.label}
                id={option.id}
                type="radio"
                name={input.name}
                value={option.value}
                handleChange={handleChange}
              />
            ));
          } else {
            return (
              <Input
                key={input.id}
                label={input.label}
                id={input.id}
                type={input.type}
                name={input.name}
                value={formData[input.name]}
                handleChange={handleChange}
                className={input.id === "amount" ? "col-span-2" : ""}
              />
            );
          }
        })}
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
