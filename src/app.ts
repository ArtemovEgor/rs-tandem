export default class App {
  private readonly parentNode: HTMLElement;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;
    this.parentNode.innerHTML = "<h1>App</h1>";
  }
}
