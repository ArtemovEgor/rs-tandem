import type BaseComponent from "@/components/base/base-component";

export interface IBaseComponentConfig {
  tag?: keyof HTMLElementTagNameMap;
  className?: string;
  id?: string;
  text?: string;
  parent?: HTMLElement | BaseComponent<HTMLElement>;
  children?: (HTMLElement | BaseComponent<HTMLElement> | null)[];
}
