import { onlyNumber } from "./regx";

export const initialValue = {
  cardHolderName: "",
  cardNumber: "",
  month: "",
  year: "",
  date: "01-24",
  cvc: "",
};

export const checkNumberOnly = (e) => {
  const values = e?.target?.value;
  return onlyNumber.test(values);
};
