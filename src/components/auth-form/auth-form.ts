import { renderAuthField } from "@/utils/create-auth-field";
import BaseComponent from "../base/base-component";
import { EN } from "@/locale/en";
import { INPUT_VALIDATION } from "@/constants/input-validation";
import { Button } from "../button/button";
import "./auth-form.scss";
import { ROUTES } from "@/constants/routes";
import { router } from "@/router/router";
import { NotificationType } from "@/constants/notification";
import Notification from "../notification/notification";
import { authService } from "@/services/auth-service/auth-service";

export default class AuthForm extends BaseComponent<HTMLFormElement> {
  private emailInput: HTMLInputElement | undefined = undefined;
  private passwordInput: HTMLInputElement | undefined = undefined;
  private emailError: HTMLElement | undefined = undefined;
  private passwordError: HTMLElement | undefined = undefined;
  private submitButton: HTMLButtonElement | undefined = undefined;

  constructor() {
    super({
      tag: "form",
      className: "auth-form",
    });

    this.init();
  }

  private init(): void {
    this.renderFields();
    this.renderButton();
    this.initListeners();
  }

  private renderFields(): void {
    this.renderEmailField();
    this.renderPasswordField();
  }

  private renderEmailField(): void {
    const emailFieldWrapper = renderAuthField({
      parent: this,
      classNames: {
        div: "auth-field auth-field--email",
        label: "auth-field__label",
        input: "auth-field__input",
        error: "auth-field__error",
      },
      id: "auth-email",
      type: "email",
      labelText: EN.common.auth.email,
      placeholderText: EN.common.auth.email_placeholder,
      validationAttributes: {
        minLength: 5,
        maxLength: 254,
      },
    });

    this.emailInput = emailFieldWrapper.input;
    this.emailError = emailFieldWrapper.error;
  }

  private renderPasswordField(): void {
    const passwordFieldWrapper = renderAuthField({
      parent: this,
      classNames: {
        div: "auth-field auth-field--password",
        label: "auth-field__label",
        input: "auth-field__input",
        error: "auth-field__error",
      },
      id: "auth-password",
      type: "password",
      labelText: EN.common.auth.password,
      placeholderText: EN.common.auth.password_placeholder,
      validationAttributes: {
        minLength: 6,
        maxLength: 50,
      },
    });

    this.passwordInput = passwordFieldWrapper.input;
    this.passwordError = passwordFieldWrapper.error;
  }

  private renderButton(): void {
    this.submitButton = new Button({
      text: EN.common.auth.login_button,
      className: "button--login",
      attributes: {
        disabled: "",
      },
      parent: this,
    }).getNode();
  }

  private initListeners(): void {
    this.emailInput?.addEventListener("input", () => this.validateForm());
    this.passwordInput?.addEventListener("input", () => this.validateForm());

    this.getNode().addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  private validateForm(): void {
    if (!this.emailInput || !this.passwordInput || !this.submitButton) return;

    const isEmailValid = this.handleInputValidation(
      this.emailInput,
      this.emailError,
      INPUT_VALIDATION.EMAIL,
    );

    const isPasswordValid = this.handleInputValidation(
      this.passwordInput,
      this.passwordError,
      INPUT_VALIDATION.PASSWORD,
    );

    this.submitButton.disabled = !(isEmailValid && isPasswordValid);
  }

  private handleInputValidation(
    input: HTMLInputElement,
    errorElement: HTMLElement | undefined,
    patternString: string,
  ): boolean {
    if (!errorElement) return false;

    input.setCustomValidity("");

    if (!input.checkValidity()) {
      const message = this.getCustomErrorMessage(input);
      this.showError(input, errorElement, message);
      return false;
    }

    try {
      const regex = new RegExp(patternString);
      if (!regex.test(input.value)) {
        const customError =
          input.dataset.errorText || EN.common.validation.default_error;
        this.showError(input, errorElement, customError);
        return false;
      }
    } catch {
      throw new Error(EN.common.validation.default_error);
    }

    this.hideError(input, errorElement);
    return true;
  }

  private getCustomErrorMessage(input: HTMLInputElement): string {
    const { validity } = input;

    if (validity.valueMissing) {
      return EN.common.validation.empty;
    }

    if (validity.tooShort) {
      return `${EN.common.validation.too_short} ${input.minLength} ${EN.common.validation.characters}`;
    }

    if (validity.tooLong) {
      return `${EN.common.validation.too_long} ${input.maxLength} ${EN.common.validation.characters}`;
    }

    if (validity.patternMismatch) {
      switch (input) {
        case this.emailInput: {
          return EN.common.validation.email_error;
        }
        case this.passwordInput: {
          return EN.common.validation.password_error;
        }
      }
    }

    return input.validationMessage;
  }

  private showError(
    input: HTMLInputElement,
    errorElement: HTMLElement,
    message: string,
  ): void {
    input.classList.add("auth-field__input--invalid");
    errorElement.textContent = message;
  }

  private hideError(input: HTMLInputElement, errorElement: HTMLElement): void {
    input.classList.remove("auth-field__input--invalid");
    errorElement.textContent = "";
  }

  private async onSubmit(): Promise<void> {
    if (!this.submitButton || !this.emailInput || !this.passwordInput) return;

    this.submitButton.disabled = true;

    try {
      await authService.loginUser();

      router.navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      Notification.show(message, NotificationType.ERROR);
    } finally {
      this.validateForm();
    }
  }
}
