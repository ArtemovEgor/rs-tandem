import { EN } from "@/locale/en";
import BaseComponent from "../base/base-component";
import Modal from "../modal/modal";
import AuthForm from "../auth-form/auth-form";

// type AuthTabs = 'login' | "register";

export default class AuthModal extends Modal {
  constructor() {
    super("modal modal--auth");
    this.render();
  }

  private render(): void {
    new BaseComponent({
      tag: "h2",
      text: EN.common.auth.login,
      parent: this,
    });

    this.addChildren([new AuthForm()]);
  }
}
