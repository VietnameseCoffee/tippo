import "./tippo.scss";

import { throttle } from "lodash";

type animation = "grow";
type animationEntry = "fade-in" | "pop-away";
type color = "blue" | "gray" | "green" | "purple" | "default";

type state = "active" | "hidden";
type targetPos = 1 | 2 | 3;
type side = "above" | "below";

export type TippoOptions = {
  tippoId: string;

  animation?: animation;
  animationEntry?: animationEntry;
  buttonContent?: string;
  color?: color;
  content: string;
  side?: side;
  targetPos?: targetPos;
  noPersist?: boolean;
};

const THEME_COLORS = ["blue", "gray", "green", "purple", "default"];
const BUFFER = 12;

class Tippo {
  #elements: HTMLElement;
  #id: string;
  #noPersist: boolean;
  #options: TippoOptions;
  #observer: MutationObserver;
  #state: state;
  #targetId: string;
  #positionCallback: () => void;

  constructor(targetId: string, options: TippoOptions) {
    if (!options.tippoId) {
      console.error("TippoId is missing, tooltip not created");
      return null;
    }
    this.#id = options.tippoId;
    this.#noPersist = options.noPersist === true ? true : false;
    this.#options = options;
    this.#state = "hidden";
    this.#targetId = targetId;
  }
  /**
   * Creates the popover elements and appends to the dom if possible
   * Perform initial validations first if the instance can append
   * Create the element then append with resize listeners/observers
   *
   * @returns boolean
   */
  append(): boolean {
    // checks if tippo is seen based on persist options
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

      // create callback to reassign position
      this.#positionCallback = throttle(() => {
        this.#setPopoverPosition(nodeEl, target, this.#options);
      }, 180);

      // observers to update popover position
      // add observer and listeners
      this.#observer = new MutationObserver(this.#positionCallback);
      this.#observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      window.addEventListener("resize", this.#positionCallback);

      // add close listener
      const closeButton = nodeEl.querySelector(".popover-close");
      closeButton.addEventListener("click", () => {
        this.#close();
      });

      this.#elements = nodeEl;
      this.#updateViewState("active");
      this.#positionCallback();
    } catch (e) {
      console.error(`Could not add popover ${e}`);
      returnState = false;
    }

    return returnState;
  }

  remove(): boolean {
    let state = false;
    if (this.#elements && this.#state !== "hidden") {
      this.#removeNodesFromDom();
      this.#updateViewState("hidden");
      state = true;
    }

    return state;
  }

  isOpen(): boolean {
    return this.#state === "active";
  }

  reset(): boolean {
    localStorage.setItem(this.#id, "");
    return true;
  }

  /**************************************************************
   * PRIVATE
   */

  #deactiveListeners() {
    window.removeEventListener("resize", this.#positionCallback);
    this.#observer.disconnect();
  }

  #close = () => {
    if (this.#elements) {
      this.#removeNodesFromDom();
      this.#updateViewState("hidden");
      this.#updateStoredViewState();
    }
  };

  #createToolTip({
    animation,
    animationEntry,
    buttonContent = "Okay",
    color = "default",
    content = "",
    side = "above",
    targetPos = 2,
  }: TippoOptions) {
    // create tooltip container
    const tooltip = document.createElement("div");
    tooltip.classList.add("tippo-popup");
    tooltip.classList.add(`p-${side}`);
    // initialize starting top and left
    tooltip.style.top = "0";
    tooltip.style.left = "0";
    if (animationEntry) tooltip.classList.add(`p-${animationEntry}`);
    // create main tooltip
    const tooltipInner = document.createElement("div");
    tooltipInner.classList.add("popover-main");
    if (animation) tooltipInner.classList.add(`p-${animation}`);
    tooltip.appendChild(tooltipInner);
    // create content element
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("popover-content");
    contentDiv.innerText = content;
    // create closing element
    const closeButton = document.createElement("button");
    closeButton.classList.add("popover-close");
    closeButton.innerText = buttonContent;
    // append elements
    tooltipInner.appendChild(contentDiv);
    tooltipInner.appendChild(closeButton);

    // set arrow side
    const arrow = document.createElement("div");
    arrow.classList.add("popover-arrow");
    this.#setArrowSide(arrow, side);
    console.log(targetPos);
    this.#setArrowPos(arrow, targetPos);
    tooltipInner.appendChild(arrow);

    // set color themes
    const themeSet = new Set(THEME_COLORS);
    const chosenColor = themeSet.has(color) ? color : "default";
    arrow.classList.add(`p-theme-body-${chosenColor}`);
    tooltipInner.classList.add(`p-theme-body-${chosenColor}`);
    closeButton.classList.add(`p-theme-button-${chosenColor}`);

    return tooltip;
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
      left = bounds.left - popover.clientWidth / 2;
    } else if (targetPos === 2) {
      left = bounds.left + bounds.width - popover.clientWidth;
    } else {
      left = bounds.left + bounds.width / 2;
    }

    // adjust boundary if popover is out of window
    if (left + popover.clientWidth + BUFFER > window.innerWidth) {
      let windowAdjust = window.innerWidth - (popover.clientWidth + BUFFER);
      left = windowAdjust;
    }

    if (left < 0) {
      left = 10;
    }

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }

  /**
   * Utilities
   */

  #removeNodesFromDom() {
    this.#elements.remove();
    this.#elements = null;
    this.#deactiveListeners();
  }

  #updateViewState(state: state): state {
    return (this.#state = state);
  }
  /**
   * Updates the instance's view status based on its id if the
   * instance is configured to persist
   * @returns booleean, depending on the instance's noPersist
   */
  #updateStoredViewState(): boolean {
    if (this.#noPersist) return false;
    localStorage.setItem(this.#id, "true");
    return true;
  }

  #isTippoSeen(): boolean {
    if (this.#noPersist) return false;
    const value = localStorage.getItem(this.#id);
    return value === "true";
  }

  #setArrowPos(el: HTMLElement, pos: targetPos) {
    let alignClass;
    switch (pos) {
      case 1:
        alignClass = "p-arr-right";
        break;
      case 2:
        alignClass = "p-arr-center";
        break;
      case 3:
        alignClass = "p-arr-left";
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
}

export default Tippo;
