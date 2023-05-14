import { throttle } from "lodash";

type animation = "grow";
type animationEntry = "pop-away";
type color = "blue" | "green" | "purple" | "default";

type state = "active" | "closed";
type arrowPos = 1 | 2 | 3;
type targetPos = 1 | 2 | 3;
type side = "above" | "below";

export type TippoOptions = {
  tippoId: string;

  animation?: animation;
  animationEntry?: animationEntry;
  arrowPos?: arrowPos;
  color?: color;
  content: string;
  side?: side;
  targetPos?: targetPos;
};
class Tippo {
  hi: number;
  #elements: HTMLElement;
  #id: string;
  #options: TippoOptions;
  #observer: MutationObserver;
  #state: state;
  #targetId: string;
  #positionCallback: () => void;

  constructor(targetId: string, options: TippoOptions) {
    if (!options.tippoId) {
      console.error("TippoId is missing, tooltip not created");
      return;
    }
    this.hi = 4;
    this.#id = options.tippoId;
    this.#targetId = targetId;
    this.#options = options;
  }
  /**
   * Creates the popover when possible
   * runs an initial check to see if the popo
   * @returns boolean
   */
  addPopover(): boolean {
    if (this.#isTippoSeen()) return false;
    if (this.#state === "active") return false;

    // access to the body and target id
    const body = document.querySelector("body");
    const target = document.getElementById(this.#targetId);

    // check if target is available in the dom;
    if (!target) {
      console.error(`Popover cannot find target id #${this.#targetId}`);
      return false;
    }

    let returnState = true;
    try {
      const nodeEl = this.#createToolTip(this.#options);
      body.appendChild(nodeEl);

      // assign initial position of tooltip
      this.#setPopoverPosition(nodeEl, target, this.#options);

      // create callback to reassign position
      this.#positionCallback = throttle(() => {
        this.#setPopoverPosition(nodeEl, target, this.#options);
      }, 160);

      // observers to update popover position
      // add observer and listeners
      this.#observer = new MutationObserver(this.#positionCallback);
      this.#observer.observe(document, { attributes: true, subtree: true });
      window.addEventListener("resize", this.#positionCallback);

      // add close listener
      const closeButton = nodeEl.querySelector(".popover-close");
      closeButton.addEventListener("click", () => {
        this.#closePopover();
      });

      this.#elements = nodeEl;
    } catch (e) {
      console.error(`Could not add popover ${e}`);
      returnState = false;
    }

    return returnState;
  }

  #createToolTip({
    animation,
    animationEntry,
    arrowPos = 1,
    content = "",
    side = "above",
  }: TippoOptions) {
    // create popover base
    const popover = document.createElement("div");
    popover.classList.add("tippo-popup");
    popover.classList.add(`p-${side}`);
    popover.classList.add(`p-${animationEntry}`);
    // create main popover
    const popoverInner = document.createElement("div");
    popoverInner.classList.add("popover-main");
    popoverInner.classList.add(`p-${animation}`);
    popover.appendChild(popoverInner);
    // create content element
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("popover-content");
    contentDiv.innerText = content;
    // create closing element
    const closeButton = document.createElement("button");
    closeButton.classList.add("popover-close");
    closeButton.innerText = "Got It";
    // append elements
    popoverInner.appendChild(contentDiv);
    popoverInner.appendChild(closeButton);

    // set arrow side
    const arrow = document.createElement("div");
    arrow.classList.add("popover-arrow");
    this.#setArrowSide(arrow, side);
    this.#setArrowPos(arrow, arrowPos);
    popoverInner.appendChild(arrow);

    return popover;
  }

  /**
   * Utilities
   */

  #closePopover = (): boolean => {
    if (this.#elements) {
      this.#elements.remove();
      this.#elements = null;
      window.removeEventListener("resize", this.#positionCallback);
      localStorage.setItem(this.#id, "true");
    }

    return true;
  };

  #setArrowPos(el: HTMLElement, pos: arrowPos) {
    let alignClass;
    switch (pos) {
      case 1:
        alignClass = "p-arr-left";
        break;
      case 2:
        alignClass = "p-arr-center";
        break;
      case 3:
        alignClass = "p-arr-right";
        break;
      default:
        console.warn("default arrow position is chosen");
        break;
    }
    el.classList.add(alignClass);
    return el;
  }

  #setArrowSide(el: HTMLElement, side: side) {
    let sideClass;
    switch (side) {
      case "above":
        sideClass = "p-arr-bot";
        break;
      case "below":
        sideClass = "p-arr-top";
        break;
      default:
        sideClass = "p-arr-top";
        console.warn("default side is chosen");
        break;
    }
    el.classList.add(sideClass);
    return el;
  }

  #isTippoSeen(): boolean {
    const value = localStorage.getItem(this.#id);
    return value === "true";
  }

  resetPopover(): boolean {
    localStorage.setItem(this.#id, "");
    return true;
  }

  #setPopoverPosition(
    popover: HTMLElement,
    target: HTMLElement,
    options: TippoOptions
  ) {
    const { side, targetPos } = options;
    const docScrollTop = document.documentElement.scrollTop;
    const bounds = target.getBoundingClientRect();
    let top;
    let left;

    // assign position above or below
    if (side === "above") {
      top = bounds.top + docScrollTop - (popover.clientHeight + 20);
    } else {
      top = bounds.top + docScrollTop + (target.clientHeight + 20);
    }
    // assign popover relative to target
    if (targetPos === 1) {
      left = bounds.left;
    } else if (targetPos === 3) {
      left = bounds.left + bounds.width / 2;
    } else {
      left = bounds.left + bounds.width - popover.clientWidth;
    }

    // adjust boundary if popover is out of window
    if (left + popover.clientWidth > window.innerWidth) {
      let clientAdjust = bounds.right - popover.clientWidth;
      let windowAdjust = window.innerWidth - (popover.clientWidth + 40);

      left = clientAdjust < windowAdjust ? clientAdjust : windowAdjust;
    }

    if (left < 0) {
      left = 10;
    }

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }
}

export default Tippo;
