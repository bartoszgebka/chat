import { mediator } from "../mediator";
import { Page } from "../pages/page";

export function WebComponent(selector: string) {
  return (classConstructor: CustomElementConstructor) => {
    const connectedCallback = classConstructor.prototype.connectedCallback;

    classConstructor.prototype.connectedCallback = function () {
      if (connectedCallback) {
        connectedCallback.call(this);
      }

      if (this instanceof Page) {
        mediator.registerPage(this);
      }
    };

    customElements.define(selector, classConstructor);
  };
}
