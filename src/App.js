import React, { useState } from "react";
import bgMobile from "./assets/images/bg-main-mobile.png";
import bgDesktop from "./assets/images/bg-main-desktop.png";
import logo from "./assets/images/card-logo.svg";
import { format } from "date-fns";
import ThankYou from "./Thankyou";
import { useFormik } from "formik";
import { signUpSchema } from "./schema/Schema";
import { checkNumberOnly, initialValue } from "./utils/utils";

const App = () => {
  const [confirmed, setConfirmed] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: signUpSchema,
    onSubmit: () => {
      setConfirmed(true);
    },
  });

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 grid grid-cols-1">
            <div className="front-card p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />
              <div>
                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {values.cardNumber}
                </h2>
                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {values.cardHolderName}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                    {format(new Date(values.date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </div>
            <div className="back-card relative lg:ml-20">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {values.cvc}
              </p>
            </div>
          </div>
          <div className="pt-3 px-2 pb-10">
            {!confirmed && (
              <form
                className="flex flex-col justify-center gap-5 lg:h-screen"
                onSubmit={handleSubmit}
              >
                <div className="alignCenter">
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardHolderName"
                    id="cardHolderName"
                    autoComplete="off"
                    placeholder="e.g. Jane Appleseed"
                    value={values.cardHolderName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cardHolderName && touched.cardHolderName ? (
                    <p className="form-error">{errors.cardHolderName}</p>
                  ) : null}
                </div>
                <div className="alignCenter">
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    autoComplete="off"
                    placeholder="e.g. 1234 5678 9123 0000"
                    maxLength={19}
                    value={values.cardNumber}
                    onChange={(e) => {
                      if (checkNumberOnly(e)) {
                        setFieldValue("cardNumber", e.target.value);
                      }
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.cardNumber && touched.cardNumber ? (
                    <p className="form-error">{errors.cardNumber}</p>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <div className="form-exp-date">
                    <div className="date alignCenter">
                      <label htmlFor="month">Exp. Date (MM/YY)</label>
                      <input
                        type="text"
                        name="month"
                        id="month"
                        autoComplete="off"
                        placeholder="MM"
                        maxLength={2}
                        value={values.month}
                        onChange={(e) => {
                          if (checkNumberOnly(e)) {
                            setFieldValue("month", e.target.value);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      <input
                        type="text"
                        name="year"
                        id="year"
                        autoComplete="off"
                        placeholder="YY"
                        maxLength={2}
                        value={values.year}
                        onChange={(e) => {
                          if (checkNumberOnly(e)) {
                            setFieldValue("year", e.target.value);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      {(errors.month && touched.month) ||
                      (errors.year && touched.year) ? (
                        <p className="form-error">{errors.month}</p>
                      ) : null}
                    </div>
                    <div className="date alignCenter">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="off"
                        placeholder="e.g. 123"
                        value={values.cvc}
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 3))
                        }
                        onChange={(e) => {
                          if (checkNumberOnly(e)) {
                            setFieldValue("cvc", e.target.value);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.cvc && touched.cvc ? (
                        <p className="form-error">{errors.cvc}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button className="btn" type="submit">
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
