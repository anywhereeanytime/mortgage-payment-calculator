export const inputsData = [
  {
    label: "Mortgage Amount",
    id: "amount",
    type: "number",
    name: "amount",
    value: "amount",
    validation: {
      required: "This field is required",
    },
  },
  {
    label: "Mortgage Term",
    id: "term",
    type: "number",
    name: "term",
    value: "term",
    validation: {
      required: "This field is required",
    },
  },
  {
    label: "Interest Rate",
    id: "interestRate",
    type: "number",
    name: "interestRate",
    value: "interestRate",
    validation: {
      required: "This field is required",
    },
  },

  {
    label: "Mortgage Type",
    id: "mortgageType",
    type: "radio",
    name: "mortgageType",
    options: [
      {
        id: "repayment",
        value: "repayment",
        label: "Repayment",
      },
      {
        id: "interestOnly",
        value: "interestOnly",
        label: "Interest only",
      },
    ],
    validation: {
      required: "This field is required",
    },
  },
];
