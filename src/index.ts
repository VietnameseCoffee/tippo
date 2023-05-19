import "./styles/index.scss";

import { TIPS } from "./constants";
import Tippo from "./tippo/tippo";

const items = TIPS.map((t, i) => ({ id: `btn-${i}`, options: t }));

items.forEach(({ id, options }) => {
  const button = document.getElementById(id);
  const tip = new Tippo(id, options);
  button.addEventListener("click", () => {
    if (tip.isOpen()) {
      tip.hide();
    } else {
      tip.reset();
      tip.append();
    }
  });
});

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.click();
}
