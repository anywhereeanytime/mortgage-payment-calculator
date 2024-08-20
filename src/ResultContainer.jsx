import { useSelector } from "react-redux";
import illustrationEmpty from "./assets/illustration-empty.svg";

const ResultContainer = () => {
  const isResultShown = useSelector((state) => state.result.isResultShown);

  return (
    <div className="bg-slate-800 p-6 rounded-tr-3xl rounded-br-3xl">
      {isResultShown ? (
        <div>
          <h2>Your results</h2>
          <p>
            Your results are shown based on the information you provided. To
            adjust the results, edit the form and click calculate repayments
            again.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={illustrationEmpty} alt="" />
          <h2 className="text-slate-200 text-xl font-bold mb-5">
            Results shown here
          </h2>
          <p className="text-slate-400 text-center w-2/3">
            Complete the form and click calculate payments to see what your
            monthly repayments would be
          </p>
        </div>
      )}
    </div>
  );
};
export default ResultContainer;
