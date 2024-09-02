import { useForm } from "react-hook-form";
import iconCalculator from "./assets/icon-calculator.svg";
import { inputsData } from "./data.js";
import Input from "./Input.jsx";
import { useDispatch } from "react-redux";
import { setMonthlyPayment, setTotalRepayment } from "./resultSlice";
import calculateMonthlyPayment from "./calculateMonthlyPayment";
import { toggleResult } from "./resultSlice";

const FormContainer = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    const { totalRepayment, monthlyPayment } = calculateMonthlyPayment(data);
    if (monthlyPayment) {
      dispatch(setMonthlyPayment(monthlyPayment));
      dispatch(setTotalRepayment(totalRepayment));
      dispatch(toggleResult());
    }
  };

  const onReset = () => {
    reset();
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
          onClick={onReset}
        >
          Clear All
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2 grid-cols-2 font-medium"
      >
        {/* Проверяем, есть ли радиокнопки и добавляем заголовок перед ними */}
        {inputsData.map((input) => {
          if (input.type === "radio") {
            return (
              <div key={input.id} className="col-span-2">
                {/* Mortgage Type */}
                <div className="font-semibold text-md text-slate-500 mt-2 mb-2">
                  {input.label}
                </div>
                {/* Repayment
                    Interest only */}
                {input.options.map((option) => (
                  <Input
                    type="radio"
                    key={option.id}
                    label={option.label}
                    id={option.id}
                    name={input.name}
                    value={option.value}
                    register={register}
                  />
                ))}
                {/* Error message */}
                <div>
                  {errors?.[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              </div>
            );
          } else {
            {
              /* Mortgage Amount
              Mortgage Term    Interest rate */
            }
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
                  sign={input.sign}
                  name={input.name}
                  register={register}
                />
                {/* Error message */}
                <div>
                  {errors?.[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required
                    </p>
                  )}
                </div>
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
