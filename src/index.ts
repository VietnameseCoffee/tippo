import "./styles/index.scss";

import { TIPS } from "./constants";
import Tippo from "./tippo/tippo";

const items = TIPS.map((t, i) => ({ id: `btn-${i}`, options: t }));

items.forEach(({ id, options }) => {
  const button = document.getElementById(id);
  const reset = document.getElementById(`${id}-reset`);
  const tip = new Tippo(id, options);
  button?.addEventListener("click", () => {
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

const introTip = new Tippo("chat-box-target", {
  tippoId: "init-1",
  content: "Hi I'm Tippo the tool tip! Check out the Demo below",
  color: "purple",
  side: "above",
  noPersist: true,
  targetPos: 3,
  animation: "grow",
  animationEntry: "pop-away",
  buttonContent: "Hello",
});

const resetTip = new Tippo("btn-5-reset", {
  tippoId: "init-2",
  content:
    "This button resets the local state for the tool tip on the left so it can render upon clicking again",
  color: "purple",
  side: "below",
  noPersist: true,
  targetPos: 3,
  animation: "grow",
  animationEntry: "pop-away",
  buttonContent: "Click to Close",
});

setTimeout(() => {
  introTip.append();
  resetTip.append();
}, 360);
