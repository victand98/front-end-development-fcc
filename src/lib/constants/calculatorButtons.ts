export type CalculatorButton = {
  value: string;
  id: string;
  className?: string;
};

export const calculatorButtons: CalculatorButton[] = [
  {
    value: "AC",
    id: "clear",
    className: "col-span-2 bg-rose-500 hover:bg-rose-600 h-12 md:h-14 lg:h-16",
  },
  {
    value: "/",
    id: "divide",
    className: "bg-slate-400",
  },
  {
    value: "x",
    id: "multiply",
    className: "bg-slate-400",
  },
  {
    value: "7",
    id: "seven",
    className: "h-12 md:h-14 lg:h-16",
  },
  {
    value: "8",
    id: "eight",
  },
  {
    value: "9",
    id: "nine",
  },
  {
    value: "‑",
    id: "subtract",
    className: "bg-slate-400",
  },
  {
    value: "4",
    id: "four",
    className: "h-12 md:h-14 lg:h-16",
  },
  {
    value: "5",
    id: "five",
  },
  {
    value: "6",
    id: "six",
  },
  {
    value: "+",
    id: "add",
    className: "bg-slate-400",
  },
  {
    value: "1",
    id: "one",
    className: "h-12 md:h-14 lg:h-16",
  },
  {
    value: "2",
    id: "two",
  },
  {
    value: "3",
    id: "three",
  },
  {
    value: "=",
    id: "equals",
    className: "row-span-2 bg-teal-500 hover:bg-teal-600",
  },
  {
    value: "0",
    id: "zero",
    className: "col-span-2 h-12 md:h-14 lg:h-16",
  },
  {
    value: ".",
    id: "decimal",
  },
];
