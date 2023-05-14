import "./index.scss";

import type { TippoOptions } from "./tippo";
import Tippo from "./tippo";

const POPOVER_IDS = {
  MODAL_CLOSE: {
    tippoId: "POPOVER_FULLSCREEN_BUTTON",
    content:
      "Click the square to view the photo in full screen mode and the 'X' to exit the modal. \n\n You can also use the f-key or double click the photo to toggle full screen mode.",
    arrowPos: "1",
    // side: "below",
    // targetPos: 2,
    // animation: "grow",
    // animationEntry: "pop-away",
  },
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
  tippoId: "POPOVER_FULLSCREEN_BUTTON",
  content:
    "Click the square to view the photo in full screen mode and the 'X' to exit the modal. \n\n You can also use the f-key or double click the photo to toggle full screen mode.",
  arrowPos: 1,
  side: "below",
  targetPos: 2,
  animation: "grow",
  animationEntry: "pop-away",
};

console.log("hi");

var t = new Tippo("id-1", MODAL_CLOSE);
t.addPopover();
