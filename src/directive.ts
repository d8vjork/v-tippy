import { DirectiveBinding, Directive, ObjectDirective } from "vue";
import tippy, { Placement, ReferenceElement, Props } from "tippy.js";
import defaultsDeep from "lodash.defaultsdeep";
import { defaultProps } from "./plugin";
import { PartialDeep } from "type-fest";

export interface TooltipDirectiveProps {
  content?: string;
  class?: string;
  style?: string;
  tippy?: PartialDeep<Props>;
}

declare module "vue" {
  export interface ComponentCustomProperties {
    vTooltip: Directive<HTMLElement, TooltipDirectiveProps | string>;
  }
}

export const useTooltip = (
  config: Omit<TooltipDirectiveProps, "content">
): ObjectDirective<HTMLElement, TooltipDirectiveProps> => {
  // @ts-ignore
  delete config["content"];

  return {
    mounted(el: HTMLElement, binding: DirectiveBinding<TooltipDirectiveProps>) {
      el.addEventListener(
        "mouseover",
        () => registerMouseoverEvent(el, binding, config),
        { once: true }
      );
    },

    updated(el: ReferenceElement, binding) {
      el._tippy?.setContent(getContent(binding.value));
      el._tippy?.setProps(mergeAllProps(binding, undefined, el._tippy?.props));
    },

    beforeUnmount(el: ReferenceElement) {
      el._tippy?.destroy();
    },

    deep: true,
  };
};

const mergeAllProps = (
  binding: DirectiveBinding<TooltipDirectiveProps>,
  inheritedProps?: TooltipDirectiveProps,
  previousProps?: Partial<Props>
): Partial<Props> => {
  let props: Partial<Props> = {};

  if (binding.modifiers) {
    props.placement = Object.keys(binding.modifiers)[0] as Placement;
  }

  props = defaultsDeep(
    previousProps || inheritedProps?.tippy || defaultProps,
    props
  );

  previousProps
    ? delete props.content
    : (props.content = getContent(
        defaultsDeep(
          typeof binding.value === "string"
            ? { content: binding.value }
            : binding.value,
          inheritedProps
        )
      ));

  return props;
};

const registerMouseoverEvent = (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipDirectiveProps>,
  inheritedProps?: TooltipDirectiveProps
) => {
  tippy(el, mergeAllProps(binding, inheritedProps));
};

const getContent = (value: TooltipDirectiveProps) => {
  let attrs = "";
  const content = typeof value === "string" ? value : value.content;

  if (typeof value === "object") {
    attrs += value.class ? ` class="${value.class}"` : "";
    attrs += value.style ? ` style="${value.style}"` : "";
  }

  return `<div${attrs}>${content}</div>`;
};
