import "./styles/index.scss";

import type { TippoOptions } from "./tippo/tippo";

import { TIPS } from "./constants";
import Tippo from "./tippo/tippo";

const POPOVER_IDS = {
  PHOTO_GALLERY: {
    tippoId: "POPOVER_GALLERY",
    content: "Click on a photo below to see in full detail",
    arrowPos: "1",
    side: "above",
    targetPos: "2",
    animation: "grow",
    animationEntry: "pop-away",
  },
};

const items = TIPS.map((t, i) => ({ id: `btn-${i}`, options: t }));

items.forEach(({ id, options }) => {
  const button = document.getElementById(id);
  const tip = new Tippo(id, options);
  button.addEventListener("click", () => {
    if (tip.isOpen()) {
      tip.hide();
    } else {
      tip.append();
    }
  });
});
