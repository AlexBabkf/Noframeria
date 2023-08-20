import { Router } from "./services/Router.js";
import loadData from "./services/Menu.js";

window.app = {};

app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();
});
