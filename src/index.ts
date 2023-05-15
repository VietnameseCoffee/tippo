import "./styles/index.scss";

import type { TippoOptions } from "./tippo/tippo";
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

const MODAL_CLOSE: TippoOptions = {
  tippoId: "tippo_0",
  content: "This is a test tip.",
  arrowPos: 1,
  side: "below",
  targetPos: 2,
  animation: "grow",
  animationEntry: "pop-away",
};

const PHOTO_GALLERY: TippoOptions = {
  tippoId: "tippo_1",
  content: "Click on a photo below to see in full detail",
  arrowPos: 1,
  side: "above",
  targetPos: 3,
  animation: "grow",
  animationEntry: "pop-away",
  buttonContent: "Got it",
};

var tip0 = new Tippo("id-1", MODAL_CLOSE);
tip0.append();
console.log(tip0);

var tip1 = new Tippo("btn-3", PHOTO_GALLERY);
tip1.append();
console.log(tip1);

// tip0.resetPopover();
// tip1.resetPopover();
