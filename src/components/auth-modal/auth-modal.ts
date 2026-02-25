import { EN } from "@/locale/en";
import BaseComponent from "../base/base-component";
import Modal from "../modal/modal";
import AuthForm from "../auth-form/auth-form";
import "./auth-modal.scss";

// type AuthTabs = 'login' | "register";

export default class AuthModal extends Modal {
  declare content;

  constructor() {
    super("modal modal--auth");
    this.render();
  }

  private render(): void {
    new BaseComponent({
      tag: "h2",
      text: EN.common.auth.login_header,
      parent: this.content,
    });

    this.content.addChildren([new AuthForm()]);
  }
}
