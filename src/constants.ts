import type { TippoOptions } from "./tippo/tippo";

export const TIPS: Array<TippoOptions> = [
  {
    tippoId: "tippo_0",
    content: "You can adjust tool tip positions relative to the target",
    buttonContent: "Nice",
    color: "default",
    noPersist: true,
    side: "above",
    targetPos: 1,
  },
  {
    tippoId: "tippo_1",
    content: "Colors include, beige (default), blue, gray, green, and purple",
    color: "blue",
    side: "above",
    noPersist: true,
    targetPos: 1,
  },
  {
    tippoId: "tippo_2",
    content: "Add entry animations for a smoother experience!",
    buttonContent: "Cool Beans",
    color: "gray",
    noPersist: true,
    side: "above",
    targetPos: 2,
    animationEntry: "fade-in",
  },
  {
    tippoId: "tippo_3",
    content: "Tippo auto adjusts on screen resizes and dom updates",
    buttonContent: "Neat",
    color: "green",
    noPersist: true,
    side: "above",
    targetPos: 2,
    animationEntry: "surprise",
  },
  {
    tippoId: "tippo_4",
    content: "Add continuous animations to help draw users' eyes 👀",
    color: "purple",
    side: "above",
    noPersist: true,
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
    buttonContent: "Got it",
  },
  {
    tippoId: "tippo_5",
    content:
      'View state can persist leveraging LocalStorage, \n\n Close me using the tool tip button and click the "show/hide" buttons again!',
    buttonContent: "Try it!",
    side: "above",
    targetPos: 3,
    animation: "grow",
    animationEntry: "pop-away",
  },
];
