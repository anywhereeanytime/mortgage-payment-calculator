import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleResult,
  setMonthlyPayment,
  setTotalRepayment,
  clearResult,
} from "./resultSlice";
import { setError, clearError, clearAllErrors } from "./formErrorSlice";
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

  const errors = useSelector((state) => state.formError.errors);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for the input being changed
    dispatch(clearError(name));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      term: "",
      interestRate: "",
      mortgageType: "",
    });
    dispatch(clearAllErrors());
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.amount);
    const annualInterestRate = parseFloat(formData.interestRate);
    const years = parseFloat(formData.term);
    const mortgageType = formData.mortgageType;

    // Проверка на наличие необходимых данных
    if (!principal || !annualInterestRate || !years || !mortgageType)
      return null;

    const monthlyRate = annualInterestRate / 12 / 100;
    const termInMonths = years * 12;
    let monthlyPayment;

    // Рассчет для Repayment
    if (mortgageType === "repayment") {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
        (Math.pow(1 + monthlyRate, termInMonths) - 1);

      // Рассчет для Interest Only
    } else if (mortgageType === "interestOnly") {
      monthlyPayment = principal * monthlyRate;
    }

    // Вычисление totalRepayment
    const totalRepayment = monthlyPayment
      ? (monthlyPayment * termInMonths).toFixed(2)
      : null;

    dispatch(setTotalRepayment(totalRepayment));

    return monthlyPayment.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, term, interestRate, mortgageType } = formData;

    let hasErrors = false;
    if (!amount) {
      dispatch(
        setError({ field: "amount", message: "This field is required" })
      );
      hasErrors = true;
    }
    if (!term) {
      dispatch(setError({ field: "term", message: "This field is required" }));
      hasErrors = true;
    }
    if (!interestRate) {
      dispatch(
        setError({ field: "interestRate", message: "This field is required" })
      );
      hasErrors = true;
    }
    if (!mortgageType) {
      dispatch(
        setError({ field: "mortgageType", message: "This field is required" })
      );
      hasErrors = true;
    }

    if (hasErrors) return;

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
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 grid-cols-2 font-medium"
      >
        {/* Проверяем, есть ли радиокнопки и добавляем заголовок перед ними */}
        {inputsData.map((input) => {
          if (input.type === "radio") {
            return (
              <div key={input.id} className="col-span-2">
                {/* Заголовок перед радио кнопками */}
                <div className="font-semibold text-md text-slate-500 mt-2 mb-2">
                  {input.label}
                </div>
                {/* Рендеринг радио кнопок */}
                {input.options.map((option) => (
                  <Input
                    type="radio"
                    key={option.id}
                    label={option.label}
                    id={option.id}
                    name={input.name}
                    value={option.value}
                    handleChange={handleChange}
                  />
                ))}
                {/* Display error message for radio buttons if required */}
                {input.name === "mortgageType" && errors[input.name] && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[input.name]}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={input.id}
                className={`${
                  input.id === "term" || input.id === "interestRate"
                    ? "col-span-1"
                    : "col-span-2"
                }`}
              >
                <Input
                  label={input.label}
                  id={input.id}
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  handleChange={handleChange}
                  sign={input.sign}
                />
                {/* Display error message under the input field if required */}
                {errors[input.name] && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[input.name]}
                  </div>
                )}
              </div>
            );
          }
        })}

        <button
          className="bg-primary-lime text-slate-950 font-bold px-4 py-3 flex justify-center gap-2 rounded-3xl w-full md:w-2/3 hover:bg-primary-lime hover:bg-opacity-70 col-span-2 mt-3"
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
