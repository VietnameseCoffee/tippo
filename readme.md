# Tippo

## Demo

[Click Here (Desktop ideal)](https://vietnamesecoffee.github.io/projects/tippo)

## About

Tippo is a simple tool tip module written in TypeScript you can use to attach to any DOM element of your webpage.

It is highly customizable allowing you to adjust where it is relative to the target, and add color themes and animations to help engage users with the tool tip.

Tippo is a direct child of the `body` element, and can auto adjust its position in the event of a screen resize event or DOM modifications.

All it requires is a `targetId` of a DOM element, its own `id` to represent itself, and string `content` and you can append/remove the tooltip with ease given its simple API.

Additionally Tippo tracks its own viewstate by storing its view state on the users LocalStorage with the `tippoId` as its key, which you can name yourself for maximum control. View state is only updated when the tooltip's built-in confirmation button is clicked.

## Arguments

| Argument       | Options                                            | Description                                                                                                                                                                                                                                         |
| :------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonContent  | `string`                                           | Custom text for the button's confirmation                                                                                                                                                                                                           |
| color          | `string: "blue","gray","green","purple","default"` | Color theme of the entire tool tip, default is a beige yellow                                                                                                                                                                                       |
| side           | `string: "above","below"`                          | Assigns the vertical position relative to the target, tooltip does not auto-adjust if out of the viewport on the y-axis                                                                                                                             |
| noPersist      | `boolean`                                          | Sets whether the tooltip will display itself when `append()` is called. Tooltip will check LocalStorage check using the tooltip ID as the key if the value is "true" for visisted, if true, no tooltip will render. Tippo's default value is `true` |
| targetPos      | `integer: 1, 2 ,3`                                 | Assigns the tool tip position relative to the target in the x-axis. Using integers it represents left, center and right in that order.                                                                                                              |
| animation      | `string: "grow","shake"`                           | Looping animation to help draw users attention                                                                                                                                                                                                      |
| animationEntry | `string: "fade-in","pop-away","surprise"`          | Entry animation to allow for a smoother viewing experience when the tooltip enters in view                                                                                                                                                          |

## API

| Method   | Description                                                                                                                                            |
| :------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `append` | Attaches the tooltip to the DOM. Only attaches if the target element is available DOM, and the ID has not been viewed, returns a boolean if successful |
| `remove` | Removes the tooltip from the DOM, calling this does not update the view state. Returns a boolean if successful                                         |
| `isOpen` | Returns a boolean if the tooltip is shown or not on the DOM                                                                                            |
| `reset`  | Resets the tooltip's state by updating the users's LocalStorage property equal to the tool tip ID, always returns a boolean value of true              |

Note: There is no public API to manually update the tooltip's view state.

## Example

```
const tippo = new Tippo('target-dom-id`, {
    tippoId: "id-for-this-tool-tip",
    content: "Message inside tool tip",

    animation: "grow",
    animationEntry: "pop-away",
    buttonContent: "Custom button content",
    color: "purple",
    noPersist: false,
    side: "above",
    targetPos: 1,
})

tippo.append();

tippo.remove();

```
