import "./styles/index.scss";

import { TIPS } from "./constants";
import Tippo from "./tippo/tippo";

const items = TIPS.map((t, i) => ({ id: `btn-${i}`, options: t }));

items.forEach(({ id, options }) => {
  const button = document.getElementById(id);
  const reset = document.getElementById(`${id}-reset`);
  const tip = new Tippo(id, options);
  button.addEventListener("click", () => {
    if (tip.isOpen()) {
      tip.remove();
    } else {
      tip.append();
    }
  });

  if (reset) {
    reset.addEventListener("click", () => {
      tip.reset();
    });
  }
});

const tip = new Tippo("look", {
  tippoId: "tippo_4",
  content: "Hi I'm Tippo the tool tip!",
  color: "purple",
  side: "above",
  noPersist: true,
  targetPos: 3,
  animation: "grow",
  animationEntry: "pop-away",
  buttonContent: "Got it",
});
tip.append();
const tip2 = new Tippo("look", {
  tippoId: "tippo_4",
  content: "Check out the Demo below!",
  color: "purple",
  side: "below",
  noPersist: true,
  targetPos: 1,
  animation: "grow",
  animationEntry: "pop-away",
  buttonContent: "Close Me",
});
tip2.append();
