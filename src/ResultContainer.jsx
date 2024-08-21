import { useSelector } from "react-redux";
import illustrationEmpty from "./assets/illustration-empty.svg";

const ResultContainer = () => {
  const isResultShown = useSelector((state) => state.result.isResultShown);
  const monthlyPayment = useSelector((state) => state.result.monthlyPayment);

  const totalRepayment = monthlyPayment
    ? (monthlyPayment * 12 * 30).toFixed(2)
    : null;

  return (
    <div className="bg-slate-800 p-6 md:p-10 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-3xl text-slate-400">
      {isResultShown && monthlyPayment ? (
        <div>
          <h2 className="text-slate-100 text-2xl font-bold mb-3">
            Your results
          </h2>
          <p className="mb-6">
            Your results are shown based on the information you provided. To
            adjust the results, edit the form and click calculate repayments
            again.
          </p>
          <div className="bg-slate-900 py-3 px-4 rounded-md border-t-4  border-t-primary-lime ">
            <p className="pt-1">Your monthly repayments</p>
            <p className="text-primary-lime font-bold text-4xl pt-3 pb-6 border-b-2 border-b-slate-700 mb-3">
              ${monthlyPayment}
            </p>
            <p className="mb-3">Total you will repay over the term</p>
            <p className="text-slate-200 font-bold text-2xl pb-2">
              ${totalRepayment}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={illustrationEmpty} alt="" />
          <h2 className="text-slate-200 text-xl font-bold mb-5">
            Results shown here
          </h2>
          <p className="text-center w-4/5">
            Complete the form and click calculate payments to see what your
            monthly repayments would be
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultContainer;
