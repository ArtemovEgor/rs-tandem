import { renderAuthField } from "@/utils/create-auth-field";
import BaseComponent from "../base/base-component";
import { EN } from "@/locale/en";

export default class AuthForm extends BaseComponent<HTMLFormElement> {
  constructor() {
    super({
      tag: "form",
      className: "auth-form",
    });

    this.init();
  }

  private init(): void {
    renderAuthField({
      parent: this,
      classNames: {
        div: "auth-field__username",
        label: "auth-field__label",
        input: "auth-field__input",
        error: "auth-field__error",
      },
      id: "auth-login",
      type: "text",
      labelText: EN.common.auth.username,
      placeholderText: EN.common.auth.username_placeholder,
      validationAttributes: {
        minLength: 2,
        maxLength: 20,
        regex: /^[a-zA-Z0-9_]+$/,
      },
    });
  }
}
