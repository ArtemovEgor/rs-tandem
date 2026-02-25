import { INPUT_VALIDATION } from "@/constants/input-validation";
import { EN } from "@/locale/en";
import { authService } from "@/services/auth-service/auth-service";
import type { IFieldConfig } from "@/types/types";
import { BaseAuthForm } from "./base-auth-form";

export default class LoginForm extends BaseAuthForm {
  constructor() {
    super("auth-form");
  }

  protected getFieldConfigs(): IFieldConfig[] {
    return [
      {
        id: "auth-email",
        type: "email",
        label: EN.common.auth.email,
        placeholder: EN.common.auth.email_placeholder,
        pattern: INPUT_VALIDATION.EMAIL,
        errorMessage: EN.common.validation.email_error,
        minLength: 5,
        maxLength: 254,
      },
      {
        id: "auth-password",
        type: "password",
        label: EN.common.auth.password,
        placeholder: EN.common.auth.password_placeholder,
        pattern: INPUT_VALIDATION.PASSWORD,
        errorMessage: EN.common.validation.password_error,
        minLength: 6,
        maxLength: 50,
      },
    ];
  }

  protected getSubmitButtonText(): string {
    return EN.common.auth.login_button;
  }

  protected async handleSubmit(): Promise<void> {
    await authService.loginUser();
  }
}
