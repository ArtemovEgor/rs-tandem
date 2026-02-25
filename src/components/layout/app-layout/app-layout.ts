import BaseComponent from "@/components/base/base-component";
import { Sidebar } from "../sidebar/sidebar";
import "./app-layout.scss";

export class AppLayout extends BaseComponent {
  private contentArea: BaseComponent;
  private sidebar: Sidebar;

  constructor() {
    super({ tag: "div", className: "app-layout" });

    this.sidebar = new Sidebar();

    this.contentArea = new BaseComponent({
      tag: "main",
      className: "app-layout__content",
    });

    this.addChildren([
      this.createMobileHeader(),
      this.sidebar,
      this.contentArea,
    ]);
  }

  private createMobileHeader(): BaseComponent {
    const bar = new BaseComponent({ className: "mobile-bar" });

    new BaseComponent({
      tag: "span",
      className: "logo__icon",
      text: "</>",
      parent: bar,
    });

    const burger = new BaseComponent({
      tag: "button",
      className: "burger",
      parent: bar,
      children: [
        new BaseComponent({ tag: "span", className: "burger-line" }),
        new BaseComponent({ tag: "span", className: "burger-line" }),
        new BaseComponent({ tag: "span", className: "burger-line" }),
      ],
    });

    burger.on("click", () => {
      this.sidebar.toggleClass("sidebar--open");
      burger.toggleClass("burger--active");
    });

    return bar;
  }

  public setPage(page: BaseComponent): void {
    this.contentArea.getNode().replaceChildren(page.getNode());
  }
}
