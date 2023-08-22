import { Router } from "./services/Router.js";
import proxyStore from "./services/Store.js";
import loadData from "./services/Menu.js";

import MenuPage from "./components/MenuPage/index.js";
import Product from "./components/Product/index.js";

window.app = {};

app.router = Router;
app.store = proxyStore;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();
});
