import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your cardholder name"),
  cardNumber: Yup.string().min(8).required("Wrong format,numbers only"),
  month: Yup.string().min(2).required("can't be blank"),
  year: Yup.string().min(2).required("can't be blank"),
  cvc: Yup.string().min(3).required("can't be blank"),
});
