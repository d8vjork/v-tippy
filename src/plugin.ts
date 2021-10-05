import defaultsDeep from "lodash.defaultsdeep";
import { Props } from "tippy.js";
import { App, Plugin } from "vue";
import { TooltipDirectiveProps, useTooltip } from "./directive";

interface TooltipsGlobalConfig {
  globalDirectives?: boolean;
}

declare type TippyPluginConfig = Omit<TooltipDirectiveProps, "content"> &
  TooltipsGlobalConfig;

export const defaultProps: Partial<Props> = {
  placement: "top",
  allowHTML: true,
};

const installAsPlugin = (app: App, config: TippyPluginConfig) => {
  const mergedConfig = defaultsDeep({ tippy: defaultProps }, config);

  app.config.globalProperties["$tooltips"] = mergedConfig;

  if (config.globalDirectives) {
    app.directive(
      "tooltip",
      useTooltip(app.config.globalProperties?.$tooltips)
    );
  }
};

export const setupTippy = (config: TippyPluginConfig) => {
  return {
    install: (app: App) => installAsPlugin(app, config),
  } as Plugin;
};
