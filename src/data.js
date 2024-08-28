export const inputsData = [
  {
    label: "Mortgage Amount",
    id: "amount",
    type: "text",
    name: "amount",
    value: "amount",
    sign: "$",
    validation: {
      required: "This field is required",
    },
  },
  {
    label: "Mortgage Term",
    id: "term",
    type: "text",
    name: "term",
    value: "term",
    sign: "years",
    validation: {
      required: "This field is required",
    },
  },
  {
    label: "Interest Rate",
    id: "interestRate",
    type: "text",
    name: "interestRate",
    value: "interestRate",
    sign: "%",
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
