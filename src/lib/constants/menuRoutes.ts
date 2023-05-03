import { IconType } from "react-icons";
import { AiOutlineClockCircle, AiOutlineFileMarkdown } from "react-icons/ai";
import { BsCardText } from "react-icons/bs";
import { FaDrumSteelpan } from "react-icons/fa";
import { HiCalculator } from "react-icons/hi";

export type MenuRoute = {
  name: string;
  path: string;
  icon: IconType;
};

export const menuRoutes: MenuRoute[] = [
  {
    name: "Random Quote Machine",
    path: "/random-quote-machine",
    icon: BsCardText,
  },
  {
    name: "Markdown Previewer",
    path: "/markdown-previewer",
    icon: AiOutlineFileMarkdown,
  },
  {
    name: "Drum Machine",
    path: "/drum-machine",
    icon: FaDrumSteelpan,
  },
  {
    name: "JavaScript Calculator",
    path: "/javascript-calculator",
    icon: HiCalculator,
  },
  {
    name: "25 + 5 Clock",
    path: "/25--5-clock",
    icon: AiOutlineClockCircle,
  },
];
