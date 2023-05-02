import { CalculatorButton, DefaultLayout } from "@/components";
import { calculatorButtons } from "@/lib";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const JavaScriptCalculator: NextPageWithLayout = () => {
  const [formula, setFormula] = React.useState("");
  const [value, setValue] = React.useState("0");
  const [result, setResult] = React.useState("");

  const handleNumberClick = (number: string) => {
    if (value === "0") {
      setValue(number);
    } else if (value === "-0") {
      setValue(`-${number}`);
    } else {
      setValue(value + number);
    }
  };

  const handleDecimalClick = () => {
    if (!value.includes(".")) {
      setValue(value + ".");
    }
  };

  const handleOperatorClick = (operator: string) => {
    if (value.endsWith(".")) {
      setValue(value.slice(0, -1));
    }

    if (result) {
      setResult("");
      setValue(result);
    }

    if (
      (value.endsWith("+") ||
        value.endsWith("-") ||
        value.endsWith("*") ||
        value.endsWith("/")) &&
      operator !== "-"
    ) {
      setValue(value.slice(0, -1) + operator);
    } else {
      setValue(value + operator);
    }
  };

  const handleEqualsClick = () => {
    if (
      value.endsWith("+") ||
      value.endsWith("-") ||
      value.endsWith("*") ||
      value.endsWith("/")
    ) {
      setValue(value.slice(0, -1));
    }

    const expression = value
      .replace(/(\+|-|\*|\/){2,}/g, "$1") // remove consecutive operators
      .replace(/(\d*\.\d+)(\.)/g, "$1") // remove extra decimals
      .replace(/^(-\d+\.\d+)$|^(\d+\.\d+)$/g, "($1$2)") // handle negative decimals
      .replace(/(\d+)(\()/g, "$1*$2") // handle implicit multiplication
      .replace(/(\))(\d+)/g, "$1*$2"); // handle implicit multiplication

    try {
      const calculatedResult = Math.round(10000 * eval(expression)) / 10000;
      setResult(calculatedResult.toString());
      setValue(calculatedResult.toString());
    } catch (error) {
      setResult("");
      setValue("0");
    }
  };

  const handleClearClick = () => {
    setResult("");
    setValue("0");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    switch (value) {
      case "AC":
        handleClearClick();
        break;
      case "=":
        handleEqualsClick();
        break;
      case ".":
        handleDecimalClick();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperatorClick(value);
        break;
      default:
        handleNumberClick(value);
        break;
    }
  };

  return (
    <>
      <Head>
        <title>JavaScript Calculator</title>
      </Head>

      <div className="container mx-auto p-4" id="drum-machine">
        <h1 className="text-2xl font-bold text-center mb-4">
          JavaScript Calculator
        </h1>

        <div className="bg-slate-800 max-w-sm mx-auto rounded-md shadow-lg p-3 grid grid-cols-4 gap-[2px]">
          <div
            id="formula-screen"
            className="col-span-4 text-right text-orange-400 text-xs"
          >
            {formula}
          </div>
          <div
            id="display"
            className="col-span-4 text-right text-white text-xl font-mono"
          >
            {value}
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
