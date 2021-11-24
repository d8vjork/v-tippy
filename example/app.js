import { createApp } from 'vue';
import { setupTippy } from "..";
import App from "./App.vue";
import "./app.css";

const tooltips = setupTippy({
  globalDirectives: true,
  class: "rounded shadow-lg px-2 py-0.5 bg-gray-900 text-gray-200",
  tippy: {
    placement: "bottom"
  }
});

createApp(App).use(tooltips).mount('#app');