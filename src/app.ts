import AuthModal from "./components/auth-modal/auth-modal";
import { ROUTES } from "./constants/routes";
import { LandingPage } from "./pages/landing-page/landing-page";
import { router } from "./router/router";

export default class App {
  private readonly parentNode: HTMLElement;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;
    this.initRoutes();
  }

  private initRoutes(): void {
    router.setRootContainer(this.parentNode);
    router.register(ROUTES.LANDING, () => new LandingPage(), {
      isGuestOnly: true,
    });

    router.register(ROUTES.LOGIN, () => new AuthModal("login"), {
      isGuestOnly: true,
      isModal: true,
    });

    router.register(ROUTES.REGISTER, () => new AuthModal("register"), {
      isGuestOnly: true,
      isModal: true,
    });
  }
}
