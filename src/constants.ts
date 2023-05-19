import type { TippoOptions } from "./tippo/tippo";

export const TIPS: Array<TippoOptions> = [
  {
    tippoId: "tippo_0",
    content: "Hello, I'm Tippo the tool tip!",
    buttonContent: "Nice",
    color: "default",
    side: "above",
    targetPos: 1,
  },
  {
    tippoId: "tippo_1",
    content: "Pick up to 5 different color themes",
    color: "blue",
    side: "above",
    targetPos: 1,
  },
  {
    tippoId: "tippo_2",
    content: "Adjust the alignment of the tooltip relative to the target",
    buttonContent: "Cool Beans",
    color: "gray",
    side: "above",
    targetPos: 2,
  },
  {
    tippoId: "tippo_3",
    content: "Add entry animations for a smoother experience!",
    buttonContent: "Neat",
    color: "green",
    side: "above",
    targetPos: 2,
    animationEntry: "fade-in",
  },
  {
    tippoId: "tippo_4",
    content: "Add continuous animations to help draw users' eyes 👀",
    color: "purple",
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
    buttonContent: "Got it",
  },
  {
    tippoId: "tippo_5",
    content:
      "My view state can persist leveraging LocalStorage, \n\n Close me using my button and refresh the page! \n Note: Default persists",
    buttonContent: "Try it out!",
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
  },
];
