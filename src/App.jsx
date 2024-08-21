import FormContainer from "./FormContainer";
import ResultContainer from "./ResultContainer";

function App() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="grid grid-cols-2 w-full max-w-4xl bg-white rounded-3xl">
        <FormContainer />
        <ResultContainer />
      </div>
    </div>
  );
}

export default App;
