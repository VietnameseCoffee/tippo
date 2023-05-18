import type { TippoOptions } from "./tippo/tippo";

export const TIPS: Array<TippoOptions> = [
  {
    tippoId: "tippo_0",
    content: "Hello, this is tippo the tool tip!",
    color: "default",
    arrowPos: 1,
    side: "above",
    targetPos: 2,
  },
  {
    tippoId: "tippo_1",
    content: "Pick up to 5 different color themes",
    buttonContent: "Nice",
    color: "blue",
    arrowPos: 1,
    side: "above",
    targetPos: 3,
    animation: "grow",
  },
  {
    tippoId: "tippo_2",
    content: "Add animations to grab people's attention",
    buttonContent: "Cool Beans",
    color: "gray",
    arrowPos: 1,
    side: "above",
    targetPos: 3,
    animationEntry: "fade-in",
  },
  {
    tippoId: "tippo_3",
    content: "Many other types of animations too!",
    arrowPos: 1,
    buttonContent: "Neat",
    color: "green",
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
  },
  {
    tippoId: "tippo_4",
    content: "BLUE TOOL TIP",
    color: "purple",
    arrowPos: 1,
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
    buttonContent: "Got it",
  },
  {
    tippoId: "tippo_5",
    content: "Other cool tippo information",
    arrowPos: 1,
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
    buttonContent: "Got it",
  },
];
