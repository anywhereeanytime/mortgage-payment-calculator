const calculateMonthlyPayment = (data) => {
  const principal = parseFloat(data.amount);
  const annualInterestRate = parseFloat(data.interestRate);
  const years = parseFloat(data.term);
  const mortgageType = data.mortgageType;

  if (!principal || !annualInterestRate || !years || !mortgageType) return null;

  const monthlyRate = annualInterestRate / 12 / 100;
  const termInMonths = years * 12;

  let monthlyPayment;
  if (mortgageType === "repayment") {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
      (Math.pow(1 + monthlyRate, termInMonths) - 1);
  } else if (mortgageType === "interestOnly") {
    monthlyPayment = principal * monthlyRate;
  }

  const totalRepayment = monthlyPayment
    ? (monthlyPayment * termInMonths).toFixed(2)
    : null;

  return {
    totalRepayment,
    monthlyPayment: monthlyPayment
      ? parseFloat(monthlyPayment.toFixed(2))
      : null,
  };
};

export default calculateMonthlyPayment;
