import { CalculatorButton, DefaultLayout, Title } from "@/components";
import { calculatorButtons } from "@/lib";
import { evaluate } from "mathjs";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const isOperator = /[x/+‑]/;
const endsWithOperatorSymbol = /[x+‑/]$/;
const endsWithNegativeSign = /\d[x/+‑]{1}‑$/;
const maxDigits = 21;

const JavaScriptCalculator: NextPageWithLayout = () => {
  const [formula, setFormula] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("0");
  const [prevValue, setPrevValue] = React.useState("0");
  const [isEvaluated, setIsEvaluated] = React.useState(false);

  const maxDigitWarning = () => {
    setCurrentValue("Digit Limit Met");
    setPrevValue(currentValue);
    setTimeout(() => setCurrentValue(prevValue), 1000);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPrevValue("0");
    setFormula("");
    setIsEvaluated(false);
  };

  const handleOperator = (operator: string) => {
    if (!currentValue.includes("Limit")) {
      setCurrentValue(operator);
      setIsEvaluated(false);

      if (isEvaluated) setFormula(prevValue + operator);
      else if (endsWithOperatorSymbol.test(formula)) {
        if (endsWithNegativeSign.test(formula)) {
          if (operator !== "‑") setFormula(prevValue + operator);
        } else {
          let newFormula =
            (endsWithNegativeSign.test(formula + operator)
              ? formula
              : prevValue) + operator;
          setFormula(newFormula);
        }
      } else {
        setPrevValue(formula);
        setFormula(formula + operator);
      }
    }
  };

  const handleNumber = (number: string) => {
    if (!currentValue.includes("Limit")) {
      setIsEvaluated(false);

      if (currentValue.length > maxDigits) {
        maxDigitWarning();
        return;
      }

      if (isEvaluated) {
        setCurrentValue(number);
        setFormula(number !== "0" ? number : "");
      } else {
        if (currentValue === "0" && number === "0") {
          if (formula === "") setFormula(number);
          return;
        }
        if (currentValue === "0" || isOperator.test(currentValue))
          setCurrentValue(number);
        else setCurrentValue(currentValue + number);

        setFormula(
          /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + number
            : formula + number
        );
      }
    }
  };

  const handleDecimal = () => {
    if (currentValue.includes(".") || currentValue.includes("Limit")) return;
    setIsEvaluated(false);

    if (isEvaluated) {
      setCurrentValue("0.");
      setFormula("0.");
    } else {
      if (currentValue.length > maxDigits) {
        maxDigitWarning();
        return;
      }
      if (
        endsWithOperatorSymbol.test(formula) ||
        (currentValue === "0" && formula === "")
      ) {
        setCurrentValue("0.");
        setFormula(formula + "0.");
      } else {
        setCurrentValue(formula.match(/(-?\d+\.?\d*)$/)?.[0] + ".");
        setFormula(formula + ".");
      }
    }
  };

  const handleEqual = () => {
    if (currentValue.includes("Limit")) {
      return;
    }
    let expression = formula;
    while (endsWithOperatorSymbol.test(expression)) {
      expression = expression.slice(0, -1);
    }
    expression = expression
      .replace(/x/g, "*")
      .replace(/‑/g, "-")
      .replace(/--/g, "+0+0+0+0+0+0+");

    try {
      const answer = Math.round(10000 * evaluate(expression)) / 10000; // 4 decimal places
      setCurrentValue(answer.toString());
      setFormula(
        expression
          .replace(/\*/g, "⋅")
          .replace(/-/g, "‑")
          .replace("+0+0+0+0+0+0+", "‑-")
          .replace(/(x|\/|\+)‑/, "$1-")
          .replace(/^‑/, "-") +
          "=" +
          answer
      );
      setPrevValue(answer.toString());
      setIsEvaluated(true);
    } catch (error) {
      setCurrentValue("Error");
      setPrevValue("0");
      setIsEvaluated(true);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    switch (value) {
      case "AC":
        handleClear();
        break;
      case "+":
      case "‑":
      case "x":
      case "/":
        handleOperator(value);
        break;
      case "=":
        handleEqual();
        break;
      case ".":
        handleDecimal();
        break;

      default:
        handleNumber(value);
        break;
    }
  };

  return (
    <>
      <Head>
        <title>JavaScript Calculator</title>
      </Head>

      <div className="container mx-auto p-4" id="drum-machine">
        <Title>JavaScript Calculator</Title>

        <div className="bg-slate-800 max-w-sm mx-auto rounded-md shadow-lg p-3 grid grid-cols-4 gap-[2px]">
          <div
            id="formula-screen"
            className="col-span-4 text-right text-orange-400 text-xs"
          >
            {formula.replace(/x/g, "⋅") || "0"}
          </div>
          <div
            id="display"
            className="col-span-4 text-right text-white text-xl font-mono"
          >
            {currentValue}
          </div>

          {calculatorButtons.map((button) => (
            <CalculatorButton
              key={button.id}
              value={button.value}
              id={button.id}
              className={button.className}
              onClick={handleClick}
            >
              {button.value}
            </CalculatorButton>
          ))}
        </div>
      </div>
    </>
  );
};

JavaScriptCalculator.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default JavaScriptCalculator;
