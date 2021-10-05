# v-tippy

Create tooltips and popovers with this Vue 3 directive which uses [TippyJS](https://atomiks.github.io/tippyjs/)

## Installation

Install this directive with:

```sh
npm i --save v-tippy-3
```

```sh
yarn add v-tippy-3
```

### Global usage

```js
import { createApp } from "vue";
import { setupTippy } from "v-tippy-3";

const app = createApp(/** your app component here */);

app.use(setupTippy({
  globalDirectives: true,
  class: "rounded shadow-lg px-2 py-0.5 bg-blueGray-900 dark:bg-blueGray-600 text-blueGray-200 dark:text-blueGray-100"
}));

app.mount("#app");
```

### Local usage

```html
<template>
  <button v-tooltip="{ content: 'Hello world!' }">
    hover me!
  </button>
</template>

<script>
import { useTooltip } from "v-tippy-3";

export default {
  directives: {
    "tooltip": useTooltip({
      class: "rounded shadow-lg px-2 py-0.5 bg-blueGray-900 dark:bg-blueGray-600 text-blueGray-200 dark:text-blueGray-100"
    })
  }
}
</script>
```

### Local usage (Setup RFC)

```html
<template>
  <button v-tooltip="{ content: 'Hello world!' }">
    hover me!
  </button>
</template>

<script setup>
import { useTooltip } from "v-tippy-3";

const vTooltip = useTooltip({
  class: "rounded shadow-lg px-2 py-0.5 bg-blueGray-900 dark:bg-blueGray-600 text-blueGray-200 dark:text-blueGray-100"
})
</script>
```

## Options

### By value

The value can be used as HTML content or as an object props with custom styling:

```html
<template>
  <button v-tooltip="tooltipProps">
    hover me!
  </button>
</template>

<script>
export default {
  setup() {
    const tooltipProps = {
      content: "Hello world!",
      class: "my-tooltip-class",
      style: "background-color: #000;"
    }

    return { tooltipProps }
  }
}
</script>
```

### By modifiers (placement only)

You can only set the placement by modifier like so:

```html
<template>
  <a href="#" ref="myLink" v-tooltip.bottom="'Hello world!'">Hover me and see on the bottom!</a>
  <a href="#" ref="myLink" v-tooltip.left="'Hello world!'">Hover me and see on the left!</a>
</template>
```

[Learn more about all the positions here](https://atomiks.github.io/tippyjs/v6/all-props/#placement).

### By reference

Apart from all of this options, you could also setup everything by reference.

```html
<template>
  <a href="#" ref="myLink" v-tooltip="'Hello world!'">Hover me!</a>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const myLink = ref(null);

    myLink.value?._tippy.setProps({ /** new props here */ });
  }
}
</script>
```

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
